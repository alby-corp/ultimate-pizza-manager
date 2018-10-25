
update "order" o
set muppet = (select muppet.id from muppet join muppet_old on muppet.real_name = muppet_old.username where muppet_old.id = o.muppet_old)
where muppet = '00000000-0000-0000-0000-000000000000';

alter table "order" drop column muppet_old;