DROP FUNCTION IF EXISTS get_all_users();

CREATE OR REPLACE FUNCTION get_all_users()
returns table (id uuid, full_name text, email text) as $$
begin
  return query
  select
    u.id,
    u.full_name,
    au.email
  from
    public.users as u
  join
    auth.users as au on u.id = au.id;
end;
$$ language plpgsql security definer;
