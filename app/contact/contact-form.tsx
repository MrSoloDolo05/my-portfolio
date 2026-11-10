"use client";

import { useRef, useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const submissionInProgress = useRef(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function updateField(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setFeedback(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      let result: { message?: string; error?: string };
      try {
        const parsed: unknown = await response.json();
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid response body.");
        }
        result = parsed as { message?: string; error?: string };
      } catch {
        setFeedback({
          type: "error",
          message: "We couldn't confirm your message was sent. Please try again.",
        });
        return;
      }

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: result.error || "Your message could not be sent. Please try again.",
        });
        return;
      }

      setValues(EMPTY_FORM);
      setFeedback({
        type: "success",
        message: result.message || "Your message has been sent.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Your message could not be sent. Check your connection and try again.",
      });
    } finally {
      submissionInProgress.current = false;
      setSubmitting(false);
    }
  }

  const fieldClassName =
    "mt-2 w-full border border-[#77708f] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]";

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="px-6 py-8 sm:px-10 sm:py-10"
    >
      <div className="mb-6">
        <p className="retro-label mb-2 text-[var(--accent)]">
          / SEND A MESSAGE
        </p>
        <h2 id="contact-form-heading" className="text-2xl font-bold">
          Contact form
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
          Share a question, opportunity, or collaboration idea.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="retro-panel-raised space-y-5 p-5 sm:p-7">
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name <span aria-hidden="true" className="text-[var(--accent)]">*</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={fieldClassName}
            />
          </label>

          <label className="block text-sm font-medium">
            Email <span aria-hidden="true" className="text-[var(--accent)]">*</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Subject <span className="font-normal text-[#8d87ae]">(optional)</span>
          <input
            name="subject"
            type="text"
            maxLength={150}
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className={fieldClassName}
          />
        </label>

        <label className="block text-sm font-medium">
          Message <span aria-hidden="true" className="text-[var(--accent)]">*</span>
          <textarea
            name="message"
            required
            maxLength={5000}
            rows={7}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${fieldClassName} resize-y`}
          />
        </label>

        {feedback && (
          <p
            role={feedback.type === "error" ? "alert" : "status"}
            className={
              feedback.type === "error"
                ? "border border-red-400/60 bg-red-950/30 p-3 text-sm text-red-200"
                : "border border-[var(--accent)]/50 bg-[var(--accent)]/5 p-3 text-sm text-[var(--accent)]"
            }
          >
            {feedback.message}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#111020] transition hover:bg-transparent hover:text-[var(--accent)] disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "SENDING..." : "SEND MESSAGE ↗"}
          </button>
          <span className="text-xs text-[var(--subtle)]">
            Fields marked * are required.
          </span>
        </div>
      </form>
    </section>
  );
}
