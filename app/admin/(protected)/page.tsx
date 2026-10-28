
'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';


type Project = {
  id: string;
  title: string;
  summary: string;
  project_url: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
};

type FormState = {
  title: string;
  summary: string;
  project_url: string;
  image_url: string;
};

const BUCKET = 'project-images';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const emptyForm: FormState = {
  title: '',
  summary: '',
  project_url: '',
  image_url: '',
};

async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, title, summary, project_url, image_url, display_order, created_at'
    )
    .order('display_order', { nullsFirst: true })
    .order('id');

  if (error) throw error;
  return data || [];
}

async function createProject(
  form: FormState,
  displayOrder: number
): Promise<void> {
  const supabase = createSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('You must be logged in to create a project.');
  }

  const { error } = await supabase.from('projects').insert({
    title: form.title.trim(),
    summary: form.summary.trim(),
    project_url: form.project_url.trim() || null,
    image_url: form.image_url || null,
    display_order: displayOrder,
    owner_id: user.id,
  });

  if (error) throw error;
}

async function updateProject(
  id: string,
  form: FormState
): Promise<void> {
  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from('projects')
    .update({
      title: form.title.trim(),
      summary: form.summary.trim(),
      project_url: form.project_url.trim() || null,
      image_url: form.image_url || null,
    })
    .eq('id', id);

  if (error) throw error;
}

async function deleteProject(id: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Save a complete order. Temporary negative values reduce the chance of
 * intermediate duplicate positions while the individual updates run.
 */
async function saveProjectOrder(orderedIds: string[]): Promise<void> {
  const supabase = createSupabaseClient();

  for (let index = 0; index < orderedIds.length; index++) {
    const { error } = await supabase
      .from('projects')
      .update({ display_order: -(index + 1) })
      .eq('id', orderedIds[index]);

    if (error) throw error;
  }

  for (let index = 0; index < orderedIds.length; index++) {
    const { error } = await supabase
      .from('projects')
      .update({ display_order: index + 1 })
      .eq('id', orderedIds[index]);

    if (error) throw error;
  }
}

async function uploadProjectImage(file: File): Promise<string> {
  const supabase = createSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('You must be logged in to upload an image.');
  }

  const extension = file.type === 'image/png' ? 'png' : 'jpg';
  const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [movingId, setMovingId] = useState<string | null>(null);
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load projects.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(form.image_url || null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, form.image_url]);

  const handleInputChange = (
    key: keyof FormState,
    value: string
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setError(null);

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Choose a PNG or JPG image.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError('The image must be 5 MB or smaller.');
      return;
    }

    setImageFile(file);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile);
      }

      const submittedForm = { ...form, image_url: imageUrl };

      if (editingId) {
        await updateProject(editingId, submittedForm);
        setSuccess('Project updated.');
      } else {
        const nextOrder =
          projects.reduce(
            (maximum, project) => Math.max(maximum, project.display_order),
            0
          ) + 1;

        await createProject(submittedForm, nextOrder);
        setSuccess('Project created.');
      }

      resetForm();

      // Normalize after either operation so the saved positions are 1..N.
      const freshProjects = await getProjects();
      await saveProjectOrder(freshProjects.map((project) => project.id));
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;

    setError(null);
    setSuccess(null);

    try {
      await deleteProject(id);

      const remainingProjects = await getProjects();
      await saveProjectOrder(
        remainingProjects.map((project) => project.id)
      );

      await loadProjects();
      setSuccess('Project deleted and order updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project.');
      await loadProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setError(null);
    setSuccess(null);
    setEditingId(project.id);
    setImageFile(null);
    setForm({
      title: project.title,
      summary: project.summary,
      project_url: project.project_url || '',
      image_url: project.image_url || '',
    });
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];

    setMovingId(projects[index].id);
    setError(null);
    setSuccess(null);

    try {
      await saveProjectOrder(reordered.map((project) => project.id));
      await loadProjects();
      setSuccess('Project order saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder projects.');
      await loadProjects();
    } finally {
      setMovingId(null);
    }
  };

  const handleSignOut = async () => {
  setSigningOut(true);
  setError(null);

  try {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    router.replace('/admin/login');
    router.refresh();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : 'Failed to sign out.'
    );
    setSigningOut(false);
  }
};

  if (loading) {
    return (
      <main className="min-h-screen bg-[#10152f] p-6 font-mono text-lime-300">
        LOADING PROJECT DATA...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#10152f] px-4 py-8 font-mono text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b-4 border-lime-300 pb-5">
          <p className="mb-2 text-xs tracking-[0.3em] text-cyan-300">
            PLAYER ONE // CONTROL PANEL
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wide text-lime-300 sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your portfolio projects and their display order.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
  <a
    href="/projects"
    className="inline-block border-2 border-cyan-300 px-4 py-2 text-xs font-bold uppercase text-cyan-300 transition hover:bg-cyan-300 hover:text-[#10152f]"
  >
    View Public Portfolio ↗
  </a>

  <button
    type="button"
    onClick={handleSignOut}
    disabled={signingOut}
    className="border-2 border-red-400 px-4 py-2 text-xs font-bold uppercase text-red-300 transition hover:bg-red-400 hover:text-[#10152f] disabled:opacity-50"
  >
    {signingOut ? 'Signing Out...' : 'Sign Out'}
  </button>
</div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-4 border-2 border-red-400 bg-red-950/50 p-3 text-sm text-red-200"
          >
            ERROR: {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-4 border-2 border-lime-300/60 bg-lime-300/10 p-3 text-sm text-lime-200"
          >
            {success}
          </div>
        )}

        <section className="mb-10 border-2 border-cyan-300/70 bg-[#171e3d] p-4 shadow-[5px_5px_0_#22d3ee33] sm:p-6">
          <h2 className="mb-5 text-xl font-bold uppercase text-cyan-300">
            {editingId ? '> Edit Project' : '> Add New Project'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs uppercase tracking-wider text-slate-300">
              Project title
              <input
                type="text"
                placeholder="e.g. Pixel Adventure"
                value={form.title}
                onChange={(event) =>
                  handleInputChange('title', event.target.value)
                }
                className="mt-2 w-full border-2 border-slate-600 bg-[#10152f] p-3 text-sm text-white outline-none focus:border-lime-300"
                required
              />
            </label>

            <label className="block text-xs uppercase tracking-wider text-slate-300">
              Summary
              <textarea
                placeholder="A short description of the project..."
                value={form.summary}
                onChange={(event) =>
                  handleInputChange('summary', event.target.value)
                }
                className="mt-2 w-full border-2 border-slate-600 bg-[#10152f] p-3 text-sm text-white outline-none focus:border-lime-300"
                rows={3}
              />
            </label>

            <label className="block text-xs uppercase tracking-wider text-slate-300">
              Project URL (optional)
              <input
                type="url"
                placeholder="https://example.com"
                value={form.project_url}
                onChange={(event) =>
                  handleInputChange('project_url', event.target.value)
                }
                className="mt-2 w-full border-2 border-slate-600 bg-[#10152f] p-3 text-sm text-white outline-none focus:border-lime-300"
              />
            </label>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-300">
                Project image (PNG or JPG, max 5 MB)
              </p>

              <label className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-lime-300/70 bg-[#10152f] p-4 text-center transition hover:border-lime-300 hover:bg-lime-300/5">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Project image preview"
                    className="mb-3 max-h-48 max-w-full object-contain"
                  />
                ) : (
                  <span className="mb-2 text-3xl text-lime-300">＋</span>
                )}

                <span className="text-sm font-bold text-lime-300">
                  {imageFile
                    ? imageFile.name
                    : previewUrl
                      ? 'Choose a replacement image'
                      : 'Choose PNG / JPG image'}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Click to browse files
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="sr-only"
                  onChange={(event) =>
                    handleImageChange(event.target.files?.[0] || null)
                  }
                />
              </label>

              {imageFile && (
                <button
                  type="button"
                  onClick={() => setImageFile(null)}
                  className="mt-2 text-xs text-cyan-300 underline"
                >
                  Cancel new image selection
                </button>
              )}

              {form.image_url && !imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setForm((previous) => ({ ...previous, image_url: '' }));
                    setImageFile(null);
                  }}
                  className="mt-2 ml-4 text-xs text-red-300 underline"
                >
                  Remove image
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || movingId !== null}
                className="border-2 border-lime-300 bg-lime-300 px-5 py-3 text-xs font-black uppercase text-[#10152f] transition hover:bg-transparent hover:text-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Save Changes'
                    : '＋ Create Project'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border-2 border-slate-500 px-5 py-3 text-xs font-bold uppercase text-slate-300 hover:border-white hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold uppercase text-cyan-300">
              &gt; Project Inventory
            </h2>
            <span className="text-xs text-slate-500">
              {projects.length} PROJECT{projects.length === 1 ? '' : 'S'}
            </span>
          </div>

          <p className="mb-4 text-xs leading-5 text-slate-400">
            Use Move Up and Move Down to change the public display order.
            Positions are automatically renumbered after adding or deleting.
          </p>

          {projects.length === 0 ? (
            <div className="border-2 border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
              NO PROJECTS FOUND. ADD YOUR FIRST PROJECT ABOVE.
            </div>
          ) : (
            <ol className="space-y-3">
              {projects.map((project, index) => (
                <li
                  key={project.id}
                  className="flex flex-col gap-4 border-2 border-slate-700 bg-[#171e3d] p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-lime-300 text-xl font-black text-lime-300">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-400">
                        {project.summary || 'No summary added.'}
                      </p>
                      <p className="mt-2 text-[10px] uppercase text-slate-600">
                        Saved order: {project.display_order}
                      </p>
                      {project.image_url && (
                        <p className="mt-1 break-all text-[10px] text-cyan-400">
                          Image attached
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button
                      type="button"
                      disabled={index === 0 || movingId !== null || saving}
                      onClick={() => void handleMove(index, -1)}
                      className="border border-cyan-300 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-300 hover:text-[#10152f] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↑ Move Up
                    </button>
                    <button
                      type="button"
                      disabled={
                        index === projects.length - 1 ||
                        movingId !== null ||
                        saving
                      }
                      onClick={() => void handleMove(index, 1)}
                      className="border border-cyan-300 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-300 hover:text-[#10152f] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↓ Move Down
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="border border-slate-400 px-3 py-2 text-xs text-slate-200 hover:bg-slate-200 hover:text-[#10152f]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(project.id)}
                      className="border border-red-400 px-3 py-2 text-xs text-red-300 hover:bg-red-400 hover:text-[#10152f]"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  );
}
