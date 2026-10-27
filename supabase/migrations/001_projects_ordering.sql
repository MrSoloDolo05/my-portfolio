-- Project ordering helper function
-- Called by the admin dashboard to reorder projects by display_order
CREATE OR REPLACE FUNCTION public.upsert_projects_ordered(p_ids uuid[])
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_order integer := 0;
  v_id uuid;
BEGIN
  -- Set display_order for each project based on the provided order
  FOREACH v_id IN ARRAY p_ids LOOP
    v_order := v_order + 1;
    UPDATE public.projects
    SET display_order = v_order
    WHERE id = v_id;
  END LOOP;

  -- Ensure the owner can still update the display_order
  IF NOT EXISTS (
    SELECT 1 FROM public.projects LIMIT 1
  ) THEN
    RETURN;
  END IF;
END;
$$;
