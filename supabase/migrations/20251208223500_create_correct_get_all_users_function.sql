DROP FUNCTION IF EXISTS get_all_users();

CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE(id uuid, full_name text, email text)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    u.id,
    p.full_name,
    u.email
  FROM auth.users u
  JOIN public.users p ON u.id = p.id;
$$;
