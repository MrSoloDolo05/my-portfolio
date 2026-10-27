'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useState, useEffect, useCallback } from 'react';

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
  display_order: string;
};

async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, summary, project_url, image_url, display_order, created_at')
    .order('display_order', { nullsFirst: true })
    .order('id', { nullsFirst: true });

  if (error) {
    throw error;
  }
  return data || [];
}

async function createProject(formData: FormState) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('projects')
    .insert([{
      title: formData.title,
      summary: formData.summary,
      project_url: formData.project_url || null,
      image_url: formData.image_url || null,
      display_order: parseInt(formData.display_order) || 0,
    }]);

  if (error) {
    throw error;
  }
}

async function updateProject(id: string, formData: FormState) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('projects')
    .update({
      title: formData.title,
      summary: formData.summary,
      project_url: formData.project_url || null,
      image_url: formData.image_url || null,
      display_order: parseInt(formData.display_order) || 0,
    })
    .eq('id', id);

  if (error) {
    throw error;
  }
}

async function deleteProject(id: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

async function reorderProjects(updates: { id: string; display_order: number }[]) {
  const supabase = createSupabaseClient();
  const results = await Promise.all(
    updates.map((u) =>
      supabase
        .from('projects')
        .update({ display_order: u.display_order })
        .eq('id', u.id)
    )
  );
  const errors = results.filter((r: { error: any }) => r.error);
  if (errors.length > 0) {
    throw errors[0].error;
  }
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    title: '',
    summary: '',
    project_url: '',
    image_url: '',
    display_order: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleInputChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setEditingId(null);
      } else {
        await createProject(form);
      }
      setForm({ title: '', summary: '', project_url: '', image_url: '', display_order: '' });
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to delete project.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      summary: project.summary,
      project_url: project.project_url || '',
      image_url: project.image_url || '',
      display_order: String(project.display_order),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', summary: '', project_url: '', image_url: '', display_order: '' });
  };

  const handleReorder = async (orderedIds: string[]) => {
    try {
      const updates = orderedIds.map((id, index) => ({ id, display_order: index }));
      await reorderProjects(updates);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to reorder projects.');
    }
  };

  if (loading) {
    return (
      <div className="p-4 font-mono text-sm">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-mono text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 font-mono text-sm">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <h2 className="text-lg font-bold mb-2">{editingId ? 'Edit Project' : 'Add Project'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          className="border p-2 w-full"
          rows={3}
        />
        <input
          type="text"
          placeholder="Project URL"
          value={form.project_url}
          onChange={(e) => handleInputChange('project_url', e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => handleInputChange('image_url', e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Display Order"
          value={form.display_order}
          onChange={(e) => handleInputChange('display_order', e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-bold mb-2">Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border p-3 rounded flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.summary}</p>
                  <p className="text-xs text-gray-400">
                    Order: {project.display_order} | ID: {project.id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}