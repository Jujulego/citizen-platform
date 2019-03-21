-- UP
create table document2 (
  id      integer primary key autoincrement,
  titre   varchar(255) not null,
  fichier varchar(255) not null,
  citoyen varchar(100) not null,

  foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade
);

insert into document2(id, titre, fichier, citoyen) select idDocument, titre, lien, loginCitoyen from document;
drop table document;
alter table document2 rename to document;

-- DOWN
create table document2 (
  idDocument   integer primary key autoincrement,
  titre        varchar(255),
  lien         varchar(255),
  loginCitoyen varchar(100),

  foreign key (loginCitoyen) references citoyen(loginCitoyen) on delete cascade
);

insert into document2(idDocument, titre, lien, loginCitoyen) select id, titre, fichier, citoyen from document;

drop table document;
alter table document2 rename to document;