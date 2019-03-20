-- UP
create table mission2 (
  idMission integer primary key autoincrement,
  nbPersAtteindre int unsigned,
  description text,
  lieu varchar(255),
  loginAsso varchar(100),
  titre varchar(255) default '',

  foreign key(loginAsso) references association(loginAsso) on delete cascade
);

insert into mission2 select idMission, nbPersAtteindre, description, lieu, loginAsso, titre from mission;
drop table mission;
alter table mission2 rename to mission;

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
insert into association2 select loginAsso, mdpAsso, nom, adresse, mail, tel, siteWeb, presentation, siret from association;
drop table association;
alter table association2 rename to association;

create table creneau_citoyen(
  id    integer primary key autoincrement,
  debut datetime not null,
  fin   datetime not null,

  repetitions int unsigned default 1, -- 0 => infini
  ecart       time,

  citoyen varchar(100) default null,

  foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade
);

create table creneau_mission(
  id    integer primary key autoincrement,
  debut datetime not null,
  fin   datetime not null,

  repetitions int unsigned default 1 not null, -- 0 => infini
  ecart       time,

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
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-05 14:00:00', '2019-02-05 17:00:00', '13', '168:00:00', 'charleslegrand@carolingiens.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-03 14:00:00', '2019-02-03 17:00:00', '13', '168:00:00', 'premierempire@jesuislemeilleur.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-02-09 14:00:00', '2019-02-09 17:00:00', '0',  '168:00:00', 'someone@gmail.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-01-30 9:00:00',  '2019-02-09 11:00:00', '0',  '168:00:00', 'maybe.someone@gmail.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-01-01 9:00:00',  '2019-02-09 11:00:00', '52', '168:00:00', 'gilbert-jaune@yolo.fr');
insert into creneau_citoyen(debut, fin, repetitions, ecart, citoyen) values ('2019-03-01 14:00:00', '2019-03-01 17:00:00', '4',  '168:00:00', 'jean-michel.toutlemonde@outlook.com');

insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 9:00:00',  '2019-02-02 11:00:00', 'charleslegrand@carolingiens.fr');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 14:00:00', '2019-02-02 17:00:00', 'emmanuel.macron@hotmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-25 14:00:00', '2019-02-25 17:00:00', 'bulle-supernana@yolo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-01-30 9:00:00',  '2019-01-30 11:00:00', 'belle-supernana@yolo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-01 9:00:00',  '2019-02-01 11:00:00', 'harry.potter@tutanota.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-05 20:00:00', '2019-03-05 22:00:00', 'harry.potter@tutanota.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 9:00:00',  '2019-03-12 11:00:00', 'numeroneninja@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 14:00:00', '2019-03-12 17:00:00', 'numeroneninja@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-18 14:00:00', '2019-02-18 17:00:00', 'aliceinwonderland@wanadoo.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-30 14:00:00', '2019-03-30 17:00:00', 'claude.dupond@gmail.com');

-- Date Mission
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-19 15:30:00', '2019-02-19 18:00:00', 01);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 01);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-05 10:30:00', '2019-02-05 12:00:00', 01);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-12 10:30:00', '2019-03-12 14:00:00', 02);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-01 15:30:00', '2019-03-01 18:00:00', 02);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-14 11:30:00', '2019-02-14 13:00:00', 02);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-16 15:30:00', '2019-02-16 17:30:00', 02);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-22 12:30:00', '2019-03-22 15:00:00', 02);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-30 10:30:00', '2019-03-30 15:00:00', 03);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-05 12:30:00', '2019-03-05 15:00:00', 03);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-04 15:30:00', '2019-04-04 17:30:00', 03);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-22 12:30:00', '2019-02-22 15:00:00', 03);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-24 15:30:00', '2019-02-24 17:30:00', 04);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-25 14:30:00', '2019-02-25 17:00:00', 04);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-01-30 11:00:00', '2019-01-30 12:00:00', 05);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 05);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-05 10:30:00', '2019-02-05 12:00:00', 05);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-12 10:30:00', '2019-03-12 14:00:00', 06);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-01 08:30:00', '2019-02-01 10:00:00', 06);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-09 14:15:00', '2019-02-09 16:15:00', 07);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 07);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-05 10:30:00', '2019-02-05 12:00:00', 08);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-12 10:30:00', '2019-03-12 14:00:00', 08);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-06 09:30:00', '2019-02-06 12:00:00', 08);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-04 18:00:00', '2019-02-04 19:30:00', 09);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 09);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-10 14:15:00', '2019-02-10 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-11 14:15:00', '2019-02-11 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-12 14:15:00', '2019-02-12 16:15:00', 10);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-05 10:30:00', '2019-02-05 12:00:00', 11);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-18 15:30:00', '2019-02-18 17:30:00', 11);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-14 11:30:00', '2019-02-14 13:00:00', 12);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-16 15:30:00', '2019-02-16 17:30:00', 12);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-12 10:30:00', '2019-03-12 14:00:00', 12);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-30 14:30:00', '2019-03-30 17:00:00', 13);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-10 08:00:00', '2019-03-10 11:30:00', 14);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-28 16:30:00', '2019-02-28 19:00:00', 15);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-18 15:30:00', '2019-03-18 17:30:00', 16);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-14 11:30:00', '2019-03-14 13:00:00', 16);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-16 15:30:00', '2019-03-16 17:30:00', 16);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-05 12:30:00', '2019-03-05 15:00:00', 16);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-04 15:30:00', '2019-04-04 17:30:00', 17);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-22 12:30:00', '2019-02-22 15:00:00', 18);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-18 15:30:00', '2019-04-18 17:30:00', 18);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-14 11:30:00', '2019-04-14 13:00:00', 18);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-16 15:30:00', '2019-04-16 17:30:00', 18);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-24 15:30:00', '2019-04-24 17:30:00', 19);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-18 14:30:00', '2019-02-18 15:18:00', 20);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-18 15:30:00', '2019-02-18 17:30:00', 21);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-14 11:30:00', '2019-02-14 13:00:00', 22);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-16 15:30:00', '2019-02-16 17:30:00', 23);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-22 12:30:00', '2019-03-22 15:00:00', 24);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-02-29 15:30:00', '2019-02-29 17:30:00', 25);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-03-12 12:30:00', '2019-03-12 15:00:00', 26);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-14 15:30:00', '2019-04-14 17:30:00', 27);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-05-02 12:30:00', '2019-05-02 15:00:00', 28);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-05-04 15:30:00', '2019-05-04 17:30:00', 29);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-05-03 09:30:00', '2019-05-03 11:30:00', 30);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-30 15:30:00', '2019-04-30 18:00:00', 31);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-18 15:30:00', '2019-04-18 18:00:00', 32);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-30 10:30:00', '2019-04-30 15:00:00', 33);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-30 14:30:00', '2019-04-30 17:00:00', 34);
insert into creneau_mission(debut, fin, mission) VALUES ('2019-04-30 11:00:00', '2019-04-30 12:00:00', 35);

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
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'après-midi', '2019-02-05', 'charleslegrand@carolingiens.fr');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'matin', '2019-02-02', 'charleslegrand@carolingiens.fr');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'après-midi', '2019-02-03', 'premierempire@jesuislemeilleur.fr');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'après-midi', '2019-02-09', 'someone@gmail.fr');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'après-midi', '2019-02-19', 'emmanuel.macron@hotmail.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'matin', '2019-01-30', 'maybe.someone@gmail.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'matin', '2019-01-01', 'gilbert-jaune@yolo.fr');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'après-midi', '2019-03-01', 'jean-michel.toutlemonde@outlook.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'après-midi', '2019-02-25', 'bulle-supernana@yolo.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'matin', '2019-01-30', 'belle-supernana@yolo.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'matin', '2019-02-01','harry.potter@tutanota.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'soir', '2019-02-04', 'harry.potter@tutanota.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'matin', '2019-03-12', 'numeroneninja@gmail.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'après-midi', '2019-03-12', 'numeroneninja@gmail.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'après-midi', '2019-02-18', 'aliceinwonderland@wanadoo.com');
INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('0', 'après-midi', '2019-03-30', 'claude.dupond@gmail.com');

-- Date Mission
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '18:00:00', '2019-02-19', '0001');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-10', '0001');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '12:00:00', '2019-02-05', '0001');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '14:00:00', '2019-03-12', '0002');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '18:00:00', '2019-03-01', '0002');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:30:00', '13:00:00', '2019-02-14', '0002');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-16', '0002');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-03-22', '0002');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '15:00:00', '2019-03-30', '0003');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-03-05', '0003');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-04', '0003');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-02-22', '0003');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-24', '0004');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:30:00', '17:00:00', '2019-02-25', '0004');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:00:00', '12:00:00', '2019-01-30', '0005');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-10', '0005');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '12:00:00', '2019-02-05', '0005');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '14:00:00', '2019-03-12', '0006');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('08:30:00', '10:00:00', '2019-02-01', '0006');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-09', '0007');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-10', '0007');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '12:00:00', '2019-02-05', '0008');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '14:00:00', '2019-03-12', '0008');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('09:30:00', '12:00:00', '2019-02-06', '0008');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('18:00:00', '19:30:00', '2019-02-04', '0009');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-10', '0009');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-10', '0010');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-11', '0010');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:15:00', '16:15:00', '2019-02-12', '0010');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '12:00:00', '2019-02-05', '0011');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-18', '0011');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:30:00', '13:00:00', '2019-02-14', '0012');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-16', '0012');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '14:00:00', '2019-03-12', '0012');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:30:00', '17:00:00', '2019-03-30', '0013');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('08:00:00', '11:30:00', '2019-03-10', '0014');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('16:30:00', '19:00:00', '2019-02-28', '0015');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-03-18', '0016');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:30:00', '13:00:00', '2019-03-14', '0016');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-03-16', '0016');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-03-05', '0016');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-04', '0017');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-02-22', '0018');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-18', '0018');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:30:00', '13:00:00', '2019-04-14', '0018');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-16', '0018');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-24', '0019');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:30:00', '15:18:00', '2019-02-18', '0020');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-18', '0021');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:30:00', '13:00:00', '2019-02-14', '0022');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-16', '0023');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-03-22', '0024');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-02-29', '0025');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-03-12', '0026');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-04-14', '0027');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('12:30:00', '15:00:00', '2019-05-02', '0028');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '17:30:00', '2019-05-04', '0029');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('09:30:00', '11:30:00', '2019-05-03', '0030');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '18:00:00', '2019-04-30', '0031');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('15:30:00', '18:00:00', '2019-04-18', '0032');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('10:30:00', '15:00:00', '2019-04-30', '0033');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('14:30:00', '17:00:00', '2019-04-30', '0034');
INSERT INTO `dateMission` (`horraireDebut`, `horraireFin`, `dateMission`, `idMission`) VALUES ('11:00:00', '12:00:00', '2019-04-30', '0035');

-- Lien mission & citoyen
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0001', 'charleslegrand@carolingiens.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0009', 'charleslegrand@carolingiens.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0010', 'premierempire@jesuislemeilleur.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0019', 'premierempire@jesuislemeilleur.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0007', 'someone@gmail.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0023', 'someone@gmail.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0003', 'someone@gmail.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0010', 'emmanuel.macron@hotmail.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0001', 'maybe.someone@gmail.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0010', 'maybe.someone@gmail.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0008', 'gilbert-jaune@yolo.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0011', 'gilbert-jaune@yolo.fr');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0002', 'jean-michel.toutlemonde@outlook.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0024', 'jean-michel.toutlemonde@outlook.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0004', 'bulle-supernana@yolo.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0005', 'belle-supernana@yolo.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0006', 'lea.doucet@ygmail.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0009', 'harry.potter@tutanota.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0012', 'numeroneninja@gmail.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0020', 'aliceinwonderland@wanadoo.com');
INSERT INTO `linkMissionCitoyen` (`idMission`, `loginCitoyen`) VALUES ('0013', 'claude.dupond@gmail.com');