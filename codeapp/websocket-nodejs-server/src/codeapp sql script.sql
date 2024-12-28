create database codeapp_db;
use codeapp_db;

create table user_table (user_id int auto_increment,
first_name varchar(300) not null,
last_name varchar(300) not null,
user_name varchar(300) not null unique,
user_password text(4000000000) not null,
user_email varchar(300) not null,
refresh_token text(4000000000) null,
primary key (user_id));
select * from user_table;

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

create table user_room_joined (joined_room_id int auto_increment,
user_id int not null,
created_room_id int null null,
room_name varchar(760) not null,
room_des text(4000000000) not null,
room_tag text(4000000000) not null,
room_visibility boolean not null,
constraint fk_usr_j
foreign key (created_room_id)
references user_room_created(created_room_id),
primary key (joined_room_id));

create table user_msg (msg_id int auto_increment,
user_id int not null,
msg_name varchar(760) not null,
msg_des text(4000000000) not null,
constraint fk_usr_m
foreign key (user_id)
references user_table(user_id),
primary key (msg_id));
select * from user_table;

create table user_room_msg (room_msg_id int auto_increment,
user_id int not null,
created_room_id int null null,
msg varchar(500) not null,
typeofmmsg varchar(100) not null,
constraint fk_usr_rm
foreign key (created_room_id)
references user_room_created(created_room_id),
primary key (room_msg_id));

select * from user_room_msg;

drop table user_room_created;
drop table user_room_joined;
drop table user_room_msg;
drop table user_msg;
drop table user_table;