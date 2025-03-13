create database Verba;

use Verba;

create table users(
	id int auto_increment primary key,
    uid varchar(255) not null unique,
    name varchar(100),
    email varchar(100) unique not null,
    profile_pic text,
    create_date timestamp default current_timestamp
);

insert into users (uid,name,email,profile_pic)
values ('1234526','TestUser','pru2eba@gmail.com','https://example.com/foto.jpg');

SELECT * FROM users;