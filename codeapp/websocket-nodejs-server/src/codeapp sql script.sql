create database codeapp_db;
use codeapp_db;
insert into user_table(first_name,last_name,user_name,user_password,user_email,refresh_token)
values ("2", "2","2","2","2@gmail.com", "2");
create table user_table (user_id int auto_increment,
first_name varchar(300) not null,
last_name varchar(300) not null,
user_name varchar(300) not null unique,
user_password text(4000000000) not null,
user_email varchar(300) not null,
refresh_token text(4000000000) null,
primary key (user_id));

create table user_room_created (created_room_id int auto_increment,
user_id int not null,
room_name varchar(760) not null unique,
room_des text(4000000000) not null,
room_tag text(4000000000) not null,
room_visibility boolean not null,
room_total_usr int null,
constraint fk_usr_r
foreign key (user_id)
references user_table(user_id),
primary key (created_room_id));


create table user_msg (msg_id int auto_increment,
user_id int not null,
msg_name varchar(760) not null,
msg_des text(4000000000) not null,
constraint fk_usr_m
foreign key (user_id)
references user_table(user_id),
primary key (msg_id));

select * from user_msg;
describe user_msg;
show tables;
select * from user_table;
select * from user_table where first_name = "4'" or '1 = 1';
drop table user_table;
drop table user_msg;
show tables;
select * from user_room_created where room_name like "%fav%";
drop table user_room_created;

insert into user_room_created(user_id,room_name,room_des,room_tag,room_visibility,room_total_usr)
values (3, "king","baby mmmk","mmmk",false, 2);