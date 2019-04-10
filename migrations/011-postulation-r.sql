-- UP
create table postulation2(
   creneau int          not null,
   citoyen varchar(100) not null,
   status  boolean      not null default false,
   r       int          not null default 0,

   foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade,
   foreign key (creneau) references creneau_mission(id)   on delete cascade,

   primary key (creneau, citoyen)
);

insert into postulation2(creneau, citoyen, status) select creneau, citoyen, status from postulation;
drop table postulation;
alter table postulation2 rename to postulation;

-- DOWN
create table postulation2(
   creneau int          not null,
   citoyen varchar(100) not null,
   status  boolean      not null default false,

   foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade,
   foreign key (creneau) references creneau_mission(id)   on delete cascade,

   primary key (creneau, citoyen)
);

insert into postulation2(creneau, citoyen, status) select creneau, citoyen, status from postulation;
drop table postulation;
alter table postulation2 rename to postulation;