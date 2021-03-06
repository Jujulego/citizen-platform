-- UP
create table citoyen (
  loginCitoyen varchar(100) primary key,
  mdpCitoyen   varchar(50),
  nom          varchar(255),
  prenom       varchar(100),
  mail         varchar(255), -- Supprimé (004-correctionMail)
  adresse      varchar(255),
  tel          varchar(50),
  situation    varchar(255),
  permis       boolean
);

create table association(
  loginAsso varchar(100) primary key,
  mdpAsso   varchar(50),
  nom       varchar(255),
  adresse   varchar(255),
  mail      varchar(255),
  tel       varchar(50),
  siteWeb   varchar(255)
  -- Ajouts (004-correctionMail)
  -- presentation varchar(1024) default 'Pas de présentation particuliere'
  -- siret        varchar(16) default '12345678901234'
);

create table document (
  idDocument   integer primary key autoincrement,
  titre        varchar(255),
  lien         varchar(255), -- renommé en fichier (007-document)
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade
);

create table domaineIntervention(
  idDomaine    integer primary key autoincrement,
  nom          varchar(255),
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade
);

create table competance(
  idCompetance integer primary key autoincrement,
  nom          varchar(255),
  description  varchar(255),
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade
);

create table mission(
  idMission       integer primary key autoincrement,
  recursive       boolean,      -- Supprimé (006-creneau)
  nbPersAtteindre int unsigned,
  description     varchar(666), -- => text (006-creneau)
  lieu            varchar(255),
  statut          varchar(255), -- Supprimé (006-creneau)
  loginAsso       varchar(100),
  -- Ajouts (005-add-fields-mission)
  -- titre           varchar(255) default ''

  foreign key(loginAsso) references association(loginAsso) on delete cascade
);

create table linkMissionCitoyen(
  idMission    integer,
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade,
  foreign key (idMission) references mission(idMission) on delete cascade,

  primary key (idMission, loginCitoyen)
);

create table disponibiliteCitoyen(
  recursif     boolean,
  tranche      varchar(50),
  dateDispo    date,
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade,

  primary key (loginCitoyen, dateDispo, tranche)
);

create table dateMission(
  horraireDebut time,
  horraireFin   time,
  dateMission   date,
  idMission     int,

  foreign key (idMission) references mission(idMission) on delete cascade,
  primary key (idMission, dateMission)
);

-- DOWN
drop table citoyen;
drop table document;
drop table domaineIntervention;
drop table competance;
drop table mission;
drop table linkMissionCitoyen;
drop table association;
drop table disponibiliteCitoyen;
drop table dateMission;
