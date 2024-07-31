create database codeapp_db;
use codeapp_db;
create table user_table (user_id int auto_increment,
first_name varchar(300) not null,
last_name varchar(300) not null,
user_name varchar(300) not null unique,
user_password text(4000000000) not null,
user_email varchar(300) not null,
user_img text(4000000000),
primary key (user_id));

describe table user_table;
show tables;
select * from user_table;
insert into user_table(first_name, last_name, user_name, user_password, user_email)
values ("Kingsley", "m", "m", "m", "m");
drop table user_table;