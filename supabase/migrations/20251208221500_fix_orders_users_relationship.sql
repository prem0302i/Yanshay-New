alter table public.orders drop constraint if exists fk_orders_user;
alter table public.orders drop constraint if exists users;
alter table public.orders add constraint orders_user_id_fkey foreign key (user_id) references public.users (id);
