-- UP
create table postulation2(
  creneau int not null,
  citoyen varchar(100) not null,
  status boolean default false, --ici 0 vaut postulation en attente/traitement et 1 accepté (si refus : suppression de postulation)

  foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade,
  foreign key (creneau) references creneau_mission(id) on delete cascade,

  primary key (creneau, citoyen)
);

INSERT INTO postulation2(creneau, citoyen) SELECT creneau, citoyen FROM postulation;
DROP TABLE postulation;
ALTER TABLE postulation2 RENAME TO postulation;


-- DOWN
create table postulation2 (
    creneau int not null,
    citoyen varchar(100) not null,

    foreign key (citoyen) references citoyen(loginCitoyen) on delete cascade,
    foreign key (creneau) references creneau_mission(id) on delete cascade,

    primary key (creneau, citoyen)
);

insert into postulation2(creneau, citoyen) select creneau, citoyen from postulation;

drop table postulation;
alter table postulation2 rename to postulation;
