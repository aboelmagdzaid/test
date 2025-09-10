/* Supabase SQL schema for aboelmagdzaid */

create table if not exists roles (
  id bigserial primary key,
  name text not null,
  can_modify boolean default false
);

create table if not exists users (
  id bigserial primary key,
  name text,
  username text unique,
  password_hash text,
  role_id bigint references roles(id)
);

create table if not exists tax_offices (id bigserial primary key, name text unique);
create table if not exists commercial_register_offices (id bigserial primary key, name text unique);
create table if not exists vat_offices (id bigserial primary key, name text unique);

create table if not exists tasks_catalog (
  id bigserial primary key,
  name text not null,
  description text,
  cost_price numeric default 0,
  sell_price numeric default 0
);

create table if not exists clients (
  id bigserial primary key,
  client_number text unique not null,
  full_name text,
  mobile text,
  median_person_full_name text,
  median_person_mobile text,
  agreed_payment text,
  id_number text,
  tax_number text,
  commercial_register_number text,
  activity text,
  commercial_register_office_id bigint references commercial_register_offices(id),
  commercial_register_renewal_date date,
  tax_office_id bigint references tax_offices(id),
  vat_office_id bigint references vat_offices(id),
  e_bill boolean default false,
  capital_amount numeric,
  working_start_date date,
  working_end_date date,
  last_tax_examine_date date,
  last_vat_examine_date date,
  vat_start_date date,
  platform_subscription_interval text,
  platform_subscription_renewal_date date,
  gmail_email text,
  gmail_password text,
  tax_vat_email text,
  tax_vat_password text,
  ebill_email text,
  ebill_password text
);

create table if not exists agencies (
  id bigserial primary key,
  client_id bigint references clients(id),
  delegate_full_name text,
  power_of_attorney_number text,
  power_of_attorney_date date
);

create table if not exists attachments (
  id bigserial primary key,
  client_id bigint references clients(id),
  file_name text,
  file_path text,
  uploaded_at timestamptz default now()
);

create table if not exists tasks (
  id bigserial primary key,
  task_catalog_id bigint references tasks_catalog(id),
  name text,
  description text,
  client_id bigint references clients(id),
  start_date timestamptz default now(),
  due_date timestamptz default now(),
  cost_price numeric default 0,
  sell_price numeric default 0,
  created_at timestamptz default now()
);

create or replace function set_task_due_date() returns trigger as $$
begin
  if NEW.due_date is null then
    NEW.due_date := NEW.start_date;
  end if;
  return NEW;
end;
$$ language plpgsql;

create trigger trg_set_due_date before insert on tasks
for each row execute function set_task_due_date();

create table if not exists settings (
  key text primary key,
  value text
);

insert into roles (name, can_modify) values ('admin', true) on conflict do nothing;
insert into roles (name, can_modify) values ('user', false) on conflict do nothing;

insert into tasks_catalog (name, description, cost_price, sell_price) values
('Tax Return', 'Prepare and file tax return', 1000, 1500) on conflict do nothing;
