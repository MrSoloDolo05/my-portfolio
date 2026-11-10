CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  owner_id uuid NOT NULL DEFAULT '0d9b79ac-c5bc-4a49-a8ca-94dc0390681c'::uuid
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.contact_messages FROM PUBLIC, anon, authenticated;

GRANT INSERT (name, email, subject, message)
  ON TABLE public.contact_messages
  TO anon, authenticated;

GRANT SELECT, DELETE
  ON TABLE public.contact_messages
  TO authenticated;

CREATE POLICY "Visitors can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    owner_id = '0d9b79ac-c5bc-4a49-a8ca-94dc0390681c'::uuid
  );

CREATE POLICY "Portfolio owner can read contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id
    AND owner_id = '0d9b79ac-c5bc-4a49-a8ca-94dc0390681c'::uuid
  );

CREATE POLICY "Portfolio owner can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = owner_id
    AND owner_id = '0d9b79ac-c5bc-4a49-a8ca-94dc0390681c'::uuid
  );

CREATE INDEX contact_messages_created_at_idx
  ON public.contact_messages (created_at DESC);
