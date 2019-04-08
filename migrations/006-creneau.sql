-- UP
create table association2(
   loginAsso varchar(100) primary key,
   mdpAsso varchar(50),
   nom varchar(255),
   adresse varchar(255),
   mail varchar(255),
   tel varchar(50),
   siteWeb varchar(255),
   presentation text default 'Pas de présentation particuliere',
   siret varchar(16) default '12345678901234'
);

create table mission2 (
  idMission integer primary key autoincrement,
  nbPersAtteindre int unsigned,
  description text,
  lieu varchar(255),
  loginAsso varchar(100),
  titre varchar(255) default '',

  foreign key(loginAsso) references association2(loginAsso) on delete cascade
);

insert into association2 select loginAsso, mdpAsso, nom, adresse, mail, tel, siteWeb, presentation, siret from association;
insert into mission2 select idMission, nbPersAtteindre, description, lieu, loginAsso, titre from mission;

drop table mission;
alter table mission2 rename to mission;

drop table association;
alter table association2 rename to association;

create table creneau_citoyen(
  id    integer primary key autoincrement,
  debut datetime not null,
  fin   datetime not null,

  repetitions int unsigned default 1, -- 0 => infini
  ecart       integer default null,

  citoyen varchar(100) default null,

  foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade
);

create table creneau_mission(
  id    integer primary key autoincrement,
  debut datetime not null,
  fin   datetime not null,

  repetitions int unsigned default 1 not null, -- 0 => infini
  ecart       integer default null,

  mission int default null,

  foreign key (mission) references mission(idMission) on delete cascade
);

create table postulation(
  creneau int not null,
  citoyen varchar(100) not null,

  foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade,
  foreign key (creneau) references creneau_mission(id) on delete cascade,

  primary key (creneau, citoyen)
);

drop table dateMission;
drop table linkMissionCitoyen;
drop table disponibiliteCitoyen;

-- Dispo citoyen
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-05 14:00:00', '2019-02-05 17:00:00', 13, 7, 'charleslegrand@carolingiens.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-03 14:00:00', '2019-02-03 17:00:00', 13, 7, 'premierempire@jesuislemeilleur.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-09 14:00:00', '2019-02-09 17:00:00',  0, 7, 'someone@gmail.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-01-30 09:00:00', '2019-02-09 11:00:00',  0, 7, 'maybe.someone@gmail.com');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-01-01 09:00:00', '2019-02-09 11:00:00', 52, 7, 'gilbert-jaune@yolo.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-03-01 14:00:00', '2019-03-01 17:00:00',  4, 7, 'jean-michel.toutlemonde@outlook.com');

insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 09:00:00', '2019-02-02 11:00:00', 'charleslegrand@carolingiens.fr');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 14:00:00', '2019-02-02 17:00:00', 'emmanuel.macron@hotmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-25 14:00:00', '2019-02-25 17:00:00', 'bulle-supernana@yolo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-01-30 09:00:00', '2019-01-30 11:00:00', 'belle-supernana@yolo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-01 09:00:00', '2019-02-01 11:00:00', 'harry.potter@tutanota.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-05 20:00:00', '2019-03-05 22:00:00', 'harry.potter@tutanota.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 09:00:00', '2019-03-12 11:00:00', 'numeroneninja@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 14:00:00', '2019-03-12 17:00:00', 'numeroneninja@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-18 14:00:00', '2019-02-18 17:00:00', 'aliceinwonderland@wanadoo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-30 14:00:00', '2019-03-30 17:00:00', 'claude.dupond@gmail.com');

-- Date Mission
insert into creneau_mission(id, debut, fin, mission) values (01, '2019-02-19 15:30:00', '2019-02-19 18:00:00', 01);
insert into creneau_mission(id, debut, fin, mission) values (02, '2019-02-10 14:15:00', '2019-02-10 16:15:00', 01);
insert into creneau_mission(id, debut, fin, mission) values (03, '2019-02-05 10:30:00', '2019-02-05 12:00:00', 01);
insert into creneau_mission(id, debut, fin, mission) values (04, '2019-03-12 10:30:00', '2019-03-12 14:00:00', 02);
insert into creneau_mission(id, debut, fin, mission) values (05, '2019-03-01 15:30:00', '2019-03-01 18:00:00', 02);
insert into creneau_mission(id, debut, fin, mission) values (06, '2019-02-14 11:30:00', '2019-02-14 13:00:00', 02);
insert into creneau_mission(id, debut, fin, mission) values (07, '2019-02-16 15:30:00', '2019-02-16 17:30:00', 02);
insert into creneau_mission(id, debut, fin, mission) values (08, '2019-03-22 12:30:00', '2019-03-22 15:00:00', 02);
insert into creneau_mission(id, debut, fin, mission) values (09, '2019-03-30 10:30:00', '2019-03-30 15:00:00', 03);
insert into creneau_mission(id, debut, fin, mission) values (10, '2019-03-05 12:30:00', '2019-03-05 15:00:00', 03);
insert into creneau_mission(id, debut, fin, mission) values (11, '2019-04-04 15:30:00', '2019-04-04 17:30:00', 03);
insert into creneau_mission(id, debut, fin, mission) values (12, '2019-02-22 12:30:00', '2019-02-22 15:00:00', 03);
insert into creneau_mission(id, debut, fin, mission) values (13, '2019-02-24 15:30:00', '2019-02-24 17:30:00', 04);
insert into creneau_mission(id, debut, fin, mission) values (14, '2019-02-25 14:30:00', '2019-02-25 17:00:00', 04);
insert into creneau_mission(id, debut, fin, mission) values (15, '2019-01-30 11:00:00', '2019-01-30 12:00:00', 05);
insert into creneau_mission(id, debut, fin, mission) values (16, '2019-02-10 14:15:00', '2019-02-10 16:15:00', 05);
insert into creneau_mission(id, debut, fin, mission) values (17, '2019-02-05 10:30:00', '2019-02-05 12:00:00', 05);
insert into creneau_mission(id, debut, fin, mission) values (18, '2019-03-12 10:30:00', '2019-03-12 14:00:00', 06);
insert into creneau_mission(id, debut, fin, mission) values (19, '2019-02-01 08:30:00', '2019-02-01 10:00:00', 06);
insert into creneau_mission(id, debut, fin, mission) values (20, '2019-02-09 14:15:00', '2019-02-09 16:15:00', 07);
insert into creneau_mission(id, debut, fin, mission) values (21, '2019-02-10 14:15:00', '2019-02-10 16:15:00', 07);
insert into creneau_mission(id, debut, fin, mission) values (22, '2019-02-05 10:30:00', '2019-02-05 12:00:00', 08);
insert into creneau_mission(id, debut, fin, mission) values (23, '2019-03-12 10:30:00', '2019-03-12 14:00:00', 08);
insert into creneau_mission(id, debut, fin, mission) values (24, '2019-02-06 09:30:00', '2019-02-06 12:00:00', 08);
insert into creneau_mission(debut, fin, mission) values ('2019-02-04 18:00:00', '2019-02-04 19:30:00', 09);
insert into creneau_mission(debut, fin, mission) values ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 09);
insert into creneau_mission(debut, fin, mission) values ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) values ('2019-02-11 14:15:00', '2019-02-11 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) values ('2019-02-12 14:15:00', '2019-02-12 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) values ('2019-02-05 10:30:00', '2019-02-05 12:00:00', 11);
insert into creneau_mission(debut, fin, mission) values ('2019-02-18 15:30:00', '2019-02-18 17:30:00', 11);
insert into creneau_mission(debut, fin, mission) values ('2019-02-14 11:30:00', '2019-02-14 13:00:00', 12);
insert into creneau_mission(debut, fin, mission) values ('2019-02-16 15:30:00', '2019-02-16 17:30:00', 12);
insert into creneau_mission(debut, fin, mission) values ('2019-03-12 10:30:00', '2019-03-12 14:00:00', 12);
insert into creneau_mission(debut, fin, mission) values ('2019-03-30 14:30:00', '2019-03-30 17:00:00', 13);
insert into creneau_mission(debut, fin, mission) values ('2019-03-10 08:00:00', '2019-03-10 11:30:00', 14);
insert into creneau_mission(debut, fin, mission) values ('2019-02-28 16:30:00', '2019-02-28 19:00:00', 15);
insert into creneau_mission(debut, fin, mission) values ('2019-03-18 15:30:00', '2019-03-18 17:30:00', 16);
insert into creneau_mission(debut, fin, mission) values ('2019-03-14 11:30:00', '2019-03-14 13:00:00', 16);
insert into creneau_mission(debut, fin, mission) values ('2019-03-16 15:30:00', '2019-03-16 17:30:00', 16);
insert into creneau_mission(debut, fin, mission) values ('2019-03-05 12:30:00', '2019-03-05 15:00:00', 16);
insert into creneau_mission(debut, fin, mission) values ('2019-04-04 15:30:00', '2019-04-04 17:30:00', 17);
insert into creneau_mission(debut, fin, mission) values ('2019-02-22 12:30:00', '2019-02-22 15:00:00', 18);
insert into creneau_mission(debut, fin, mission) values ('2019-04-18 15:30:00', '2019-04-18 17:30:00', 18);
insert into creneau_mission(debut, fin, mission) values ('2019-04-14 11:30:00', '2019-04-14 13:00:00', 18);
insert into creneau_mission(debut, fin, mission) values ('2019-04-16 15:30:00', '2019-04-16 17:30:00', 18);
insert into creneau_mission(debut, fin, mission) values ('2019-04-24 15:30:00', '2019-04-24 17:30:00', 19);
insert into creneau_mission(debut, fin, mission) values ('2019-02-18 14:30:00', '2019-02-18 15:18:00', 20);
insert into creneau_mission(debut, fin, mission) values ('2019-02-18 15:30:00', '2019-02-18 17:30:00', 21);
insert into creneau_mission(debut, fin, mission) values ('2019-02-14 11:30:00', '2019-02-14 13:00:00', 22);
insert into creneau_mission(debut, fin, mission) values ('2019-02-16 15:30:00', '2019-02-16 17:30:00', 23);
insert into creneau_mission(debut, fin, mission) values ('2019-03-22 12:30:00', '2019-03-22 15:00:00', 24);
insert into creneau_mission(debut, fin, mission) values ('2019-02-29 15:30:00', '2019-02-29 17:30:00', 25);
insert into creneau_mission(debut, fin, mission) values ('2019-03-12 12:30:00', '2019-03-12 15:00:00', 26);
insert into creneau_mission(debut, fin, mission) values ('2019-04-14 15:30:00', '2019-04-14 17:30:00', 27);
insert into creneau_mission(debut, fin, mission) values ('2019-05-02 12:30:00', '2019-05-02 15:00:00', 28);
insert into creneau_mission(debut, fin, mission) values ('2019-05-04 15:30:00', '2019-05-04 17:30:00', 29);
insert into creneau_mission(debut, fin, mission) values ('2019-05-03 09:30:00', '2019-05-03 11:30:00', 30);
insert into creneau_mission(debut, fin, mission) values ('2019-04-30 15:30:00', '2019-04-30 18:00:00', 31);
insert into creneau_mission(debut, fin, mission) values ('2019-04-18 15:30:00', '2019-04-18 18:00:00', 32);
insert into creneau_mission(debut, fin, mission) values ('2019-04-30 10:30:00', '2019-04-30 15:00:00', 33);
insert into creneau_mission(debut, fin, mission) values ('2019-04-30 14:30:00', '2019-04-30 17:00:00', 34);
insert into creneau_mission(debut, fin, mission) values ('2019-04-30 11:00:00', '2019-04-30 12:00:00', 35);

-- Lien mission & citoyen
insert into postulation(creneau, citoyen) values (01, 'charleslegrand@carolingiens.fr');
insert into postulation(creneau, citoyen) values (09, 'charleslegrand@carolingiens.fr');
insert into postulation(creneau, citoyen) values (10, 'premierempire@jesuislemeilleur.fr');
insert into postulation(creneau, citoyen) values (19, 'premierempire@jesuislemeilleur.fr');
insert into postulation(creneau, citoyen) values (07, 'someone@gmail.fr');
insert into postulation(creneau, citoyen) values (23, 'someone@gmail.fr');
insert into postulation(creneau, citoyen) values (03, 'someone@gmail.fr');
insert into postulation(creneau, citoyen) values (10, 'emmanuel.macron@hotmail.com');
insert into postulation(creneau, citoyen) values (01, 'maybe.someone@gmail.com');
insert into postulation(creneau, citoyen) values (10, 'maybe.someone@gmail.com');
insert into postulation(creneau, citoyen) values (08, 'gilbert-jaune@yolo.fr');
insert into postulation(creneau, citoyen) values (11, 'gilbert-jaune@yolo.fr');
insert into postulation(creneau, citoyen) values (02, 'jean-michel.toutlemonde@outlook.com');
insert into postulation(creneau, citoyen) values (24, 'jean-michel.toutlemonde@outlook.com');
insert into postulation(creneau, citoyen) values (04, 'bulle-supernana@yolo.com');
insert into postulation(creneau, citoyen) values (05, 'belle-supernana@yolo.com');
insert into postulation(creneau, citoyen) values (06, 'lea.doucet@ygmail.com');
insert into postulation(creneau, citoyen) values (09, 'harry.potter@tutanota.com');
insert into postulation(creneau, citoyen) values (12, 'numeroneninja@gmail.com');
insert into postulation(creneau, citoyen) values (20, 'aliceinwonderland@wanadoo.com');
insert into postulation(creneau, citoyen) values (13, 'claude.dupond@gmail.com');

-- DOWN
drop table postulation;
drop table creneau_citoyen;
drop table creneau_mission;

alter table mission add column status varchar(255) default '';
alter table mission add column recursive boolean default false;

create table dateMission(
  horraireDebut time,
  horraireFin time,
  dateMission date,
  idMission INT,

  foreign key (idMission) references mission(idMission) on delete cascade,
  primary key (idMission, dateMission)
);

create table linkMissionCitoyen(
  idMission    int,
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade,
  foreign key (idMission) references mission(idMission) on delete cascade,

  primary key (idMission, loginCitoyen)
);

create table disponibiliteCitoyen(
  recursif boolean,
  tranche varchar(50),
  dateDispo date,
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade,

  primary key (loginCitoyen, dateDispo, tranche)
);

-- Dispo citoyen
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'après-midi', '2019-02-05', 'charleslegrand@carolingiens.fr');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'matin', '2019-02-02', 'charleslegrand@carolingiens.fr');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'après-midi', '2019-02-03', 'premierempire@jesuislemeilleur.fr');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'après-midi', '2019-02-09', 'someone@gmail.fr');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'après-midi', '2019-02-19', 'emmanuel.macron@hotmail.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'matin', '2019-01-30', 'maybe.someone@gmail.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'matin', '2019-01-01', 'gilbert-jaune@yolo.fr');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('1', 'après-midi', '2019-03-01', 'jean-michel.toutlemonde@outlook.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'après-midi', '2019-02-25', 'bulle-supernana@yolo.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'matin', '2019-01-30', 'belle-supernana@yolo.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) insert intovalues ('0', 'matin', '2019-02-01','harry.potter@tutanota.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'soir', '2019-02-04', 'harry.potter@tutanota.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'matin', '2019-03-12', 'numeroneninja@gmail.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'après-midi', '2019-03-12', 'numeroneninja@gmail.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'après-midi', '2019-02-18', 'aliceinwonderland@wanadoo.com');
insert into `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) values ('0', 'après-midi', '2019-03-30', 'claude.dupond@gmail.com');

-- Date Mission
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '18:00:00', '2019-02-19', '0001');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-10', '0001');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '12:00:00', '2019-02-05', '0001');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '14:00:00', '2019-03-12', '0002');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '18:00:00', '2019-03-01', '0002');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:30:00', '13:00:00', '2019-02-14', '0002');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-16', '0002');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-03-22', '0002');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '15:00:00', '2019-03-30', '0003');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-03-05', '0003');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-04', '0003');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-02-22', '0003');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-24', '0004');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:30:00', '17:00:00', '2019-02-25', '0004');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:00:00', '12:00:00', '2019-01-30', '0005');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-10', '0005');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '12:00:00', '2019-02-05', '0005');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '14:00:00', '2019-03-12', '0006');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('08:30:00', '10:00:00', '2019-02-01', '0006');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-09', '0007');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-10', '0007');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '12:00:00', '2019-02-05', '0008');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '14:00:00', '2019-03-12', '0008');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('09:30:00', '12:00:00', '2019-02-06', '0008');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('18:00:00', '19:30:00', '2019-02-04', '0009');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-10', '0009');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-10', '0010');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-11', '0010');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:15:00', '16:15:00', '2019-02-12', '0010');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '12:00:00', '2019-02-05', '0011');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-18', '0011');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:30:00', '13:00:00', '2019-02-14', '0012');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-16', '0012');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '14:00:00', '2019-03-12', '0012');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:30:00', '17:00:00', '2019-03-30', '0013');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('08:00:00', '11:30:00', '2019-03-10', '0014');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('16:30:00', '19:00:00', '2019-02-28', '0015');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-03-18', '0016');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:30:00', '13:00:00', '2019-03-14', '0016');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-03-16', '0016');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-03-05', '0016');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-04', '0017');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-02-22', '0018');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-18', '0018');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:30:00', '13:00:00', '2019-04-14', '0018');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-16', '0018');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-24', '0019');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:30:00', '15:18:00', '2019-02-18', '0020');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-18', '0021');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:30:00', '13:00:00', '2019-02-14', '0022');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-16', '0023');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-03-22', '0024');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-02-29', '0025');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-03-12', '0026');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-04-14', '0027');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('12:30:00', '15:00:00', '2019-05-02', '0028');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '17:30:00', '2019-05-04', '0029');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('09:30:00', '11:30:00', '2019-05-03', '0030');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '18:00:00', '2019-04-30', '0031');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('15:30:00', '18:00:00', '2019-04-18', '0032');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('10:30:00', '15:00:00', '2019-04-30', '0033');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('14:30:00', '17:00:00', '2019-04-30', '0034');
insert into `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) values ('11:00:00', '12:00:00', '2019-04-30', '0035');

-- Lien mission & citoyen
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0001', 'charleslegrand@carolingiens.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0009', 'charleslegrand@carolingiens.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0010', 'premierempire@jesuislemeilleur.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0019', 'premierempire@jesuislemeilleur.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0007', 'someone@gmail.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0023', 'someone@gmail.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0003', 'someone@gmail.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0010', 'emmanuel.macron@hotmail.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0001', 'maybe.someone@gmail.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0010', 'maybe.someone@gmail.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0008', 'gilbert-jaune@yolo.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0011', 'gilbert-jaune@yolo.fr');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0002', 'jean-michel.toutlemonde@outlook.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0024', 'jean-michel.toutlemonde@outlook.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0004', 'bulle-supernana@yolo.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0005', 'belle-supernana@yolo.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0006', 'lea.doucet@ygmail.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0009', 'harry.potter@tutanota.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0012', 'numeroneninja@gmail.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0020', 'aliceinwonderland@wanadoo.com');
insert into `linkMissionCitoyen` (`idMission`, `loginCitoyen`) values ('0013', 'claude.dupond@gmail.com');