-- UP
CREATE TABLE citoyen2 (loginCitoyen varchar(100) primary key, mdpCitoyen varchar(50), nom varchar(255), prenom varchar(100), adresse varchar(255), tel varchar(50), situation varchar(255), permis boolean);
INSERT INTO citoyen2 SELECT loginCitoyen, mdpCitoyen, nom, prenom, adresse, tel, situation, permis FROM citoyen;
DROP TABLE citoyen;
ALTER TABLE citoyen2 RENAME TO citoyen;

ALTER TABLE association ADD COLUMN presentation varchar(1024) default 'Pas de présentation particuliere';
ALTER TABLE association ADD COLUMN siret varchar(16) default '12345678901234';

-- DOWN
ALTER TABLE citoyen ADD COLUMN mail varchar(255) default '';

CREATE TABLE association2(loginAsso varchar(100) primary key, mdpAsso varchar(50), nom varchar(255), adresse varchar(255), mail varchar(255), tel varchar(50), siteWeb varchar(255));
INSERT INTO association2 SELECT loginAsso, mdpAsso, nom, adresse, mail, tel, siteWeb FROM association;
DROP TABLE association;
ALTER TABLE association2 RENAME TO association;
