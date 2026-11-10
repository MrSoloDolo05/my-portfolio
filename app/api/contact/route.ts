import { createClient } from "@supabase/supabase-js";

type ContactSubmission = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
};

type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_RESPONSE = { message: "Your message has been sent." };
const MAX_REQUEST_BODY_BYTES = 16 * 1024;
const MAX_REQUEST_BODY_LENGTH = 16 * 1024;

function validateSubmission(payload: unknown): ValidationResult {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return { success: false, error: "Please submit a valid contact form." };
  }

  const fields = payload as Record<string, unknown>;
  if (typeof fields.name !== "string") {
    return { success: false, error: "Enter your name." };
  }
  if (typeof fields.email !== "string") {
    return { success: false, error: "Enter your email address." };
  }
  if (typeof fields.message !== "string") {
    return { success: false, error: "Enter a message." };
  }
  if (
    fields.subject !== undefined &&
    fields.subject !== null &&
    typeof fields.subject !== "string"
  ) {
    return { success: false, error: "Enter a valid subject." };
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject =
    typeof fields.subject === "string" ? fields.subject.trim() : "";
  const message = fields.message.trim();

  if (!name) {
    return { success: false, error: "Enter your name." };
  }
  if (name.length > 100) {
    return { success: false, error: "Name must be 100 characters or fewer." };
  }
  if (!email) {
    return { success: false, error: "Enter your email address." };
  }
  if (email.length > 254) {
    return {
      success: false,
      error: "Email address must be 254 characters or fewer.",
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, error: "Enter a valid email address." };
  }
  if (subject.length > 150) {
    return {
      success: false,
      error: "Subject must be 150 characters or fewer.",
    };
  }
  if (!message) {
    return { success: false, error: "Enter a message." };
  }
  if (message.length > 5000) {
    return {
      success: false,
      error: "Message must be 5000 characters or fewer.",
    };
  }

  return {
    success: true,
    data: { name, email, subject: subject || null, message },
  };
}

function createAnonymousSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Supabase public configuration is missing.");
  }

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    const declaredLength = Number(contentLength);
    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_REQUEST_BODY_BYTES
    ) {
      return Response.json(
        { error: "Request body is too large." },
        { status: 413 },
      );
    }
  }

  if (!request.body) {
    return Response.json(
      { error: "Submit the form using valid JSON." },
      { status: 400 },
    );
  }

  let rawBody: string;
  try {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BODY_BYTES) {
        await reader.cancel();
        return Response.json(
          { error: "Request body is too large." },
          { status: 413 },
        );
      }

      chunks.push(value);
    }

    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    rawBody = new TextDecoder().decode(body);
  } catch {
    return Response.json(
      { error: "Submit the form using valid JSON." },
      { status: 400 },
    );
  }

  if (rawBody.length > MAX_REQUEST_BODY_LENGTH) {
    return Response.json(
      { error: "Request body is too large." },
      { status: 413 },
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json(
      { error: "Submit the form using valid JSON." },
      { status: 400 },
    );
  }

  const fields =
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : null;

  if (typeof fields?.website === "string" && fields.website.trim()) {
    return Response.json(SUCCESS_RESPONSE);
  }

  const validation = validateSubmission(payload);
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  try {
    const supabase = createAnonymousSupabaseClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert(validation.data);

    if (error) {
      console.error("Contact message insert failed.", { code: error.code });
      return Response.json(
        { error: "Your message could not be sent. Please try again later." },
        { status: 500 },
      );
    }

    return Response.json(SUCCESS_RESPONSE);
  } catch {
    console.error("Contact message submission could not be completed.");
    return Response.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 500 },
    );
  }
}
