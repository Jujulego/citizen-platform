-- UP
drop table domaineIntervention;

create table domaine(
  id  integer primary key autoincrement,
  nom varchar(255) not null
);

create table domaine_mission(
  domaine integer not null,
  mission integer not null,

  foreign key (domaine) references domaine(id) on delete cascade,
  foreign key (mission) references mission(idMission) on delete cascade
);

insert into domaine(id, nom) values (1, 'Ecologie'); -- test
insert into domaine(id, nom) values (null, 'Social');
insert into domaine(id, nom) values (null, 'Scolaire');

-- DOWN
drop table domaine_mission;
drop table domaine;

create table domaineIntervention(
  idDomaine    integer primary key autoincrement,
  nom          varchar(255),
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade
);