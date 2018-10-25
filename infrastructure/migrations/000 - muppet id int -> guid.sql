alter table muppet rename to muppet_old;

alter table "order" drop constraint order_muppet_fkey ;
alter table muppet_old drop constraint  muppet_pkey ;

create table muppet
(
  id uuid not null constraint muppet_pkey primary key,
  real_name text
);

insert into muppet (id, real_name) values ('00000000-0000-0000-0000-000000000000', 'temp-user');

create table order_old as select * from "order";

alter table "order" rename muppet to muppet_old;
alter table "order" alter column muppet_old drop not null;

alter table "order" add muppet uuid not null constraint order_muppet_fkey references muppet default '00000000-0000-0000-0000-000000000000';

drop table administrator;

create table administrator
(
  id serial not null constraint administrator_pkey primary key,
  muppet uuid,
  onholiday boolean
);