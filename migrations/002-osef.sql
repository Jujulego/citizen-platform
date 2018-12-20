-- UP
CREATE TABLE citoyen (loginCitoyen varchar(100) primary key, mdpCitoyen varchar(50), nom varchar(255), prenom varchar(100), mail varchar(255), adresse varchar(255), tel varchar(50), situation varchar(255), permis boolean);
CREATE TABLE document (idDocument INT primary key, titre varchar(255), lien varchar(255), loginCitoyen varchar(100), foreign key (loginCitoyen) references citoyen(loginCitoyen));
CREATE TABLE domaineIntervention(idDomaine INT primary key, nom varchar(255), loginCitoyen varchar(100), foreign key (loginCitoyen) references citoyen(loginCitoyen));
CREATE TABLE competance(idCompetance INT primary key, nom varchar(255), description varchar(255), loginCitoyen varchar(100), foreign key (loginCitoyen) references citoyen(loginCitoyen));
CREATE TABLE association(loginAsso varchar(100) primary key, mdpAsso varchar(50), nom varchar(255), adresse varchar(255), mail varchar(255), tel varchar(50), siteWeb varchar(255));
CREATE TABLE mission (idMission INT primary key, recursive boolean, nbPersAtteindre INT UNSIGNED, description varchar(666), lieu varchar(255), statut varchar(255), loginAsso varchar(100), foreign key(loginAsso) references association(loginAsso));
CREATE TABLE linkMissionCitoyen (idMission INT, loginCitoyen varchar(100), foreign key (loginCitoyen) references citoyen(loginCitoyen) , foreign key (idMission) references mission(idMission), PRIMARY KEY (idMission, loginCitoyen));
CREATE TABLE disponibiliteCitoyen (recursif boolean, tranche varchar(50), dateDispo date, loginCitoyen varchar(100), foreign key (loginCitoyen) references citoyen(loginCitoyen) , primary key (loginCitoyen, dateDispo, tranche) );
CREATE TABLE dateMission (horraireDebut time, horraireFin time, dateMission date, idMission INT, foreign key (idMission) references mission(idMission), primary key (idMission, dateMission));

-- DOWN
DROP TABLE citoyen;
DROP TABLE document;
DROP TABLE domaineIntervention;
DROP TABLE competance;
DROP TABLE mission;
DROP TABLE linkMissionCitoyen;
DROP TABLE association;
DROP TABLE disponibiliteCitoyen;
DROP TABLE dateMission;
