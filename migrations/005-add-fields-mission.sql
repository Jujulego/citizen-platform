-- UP
alter table mission add column titre varchar(255) default '';
UPDATE mission SET titre = 'Mission ' || idMission;

-- DOWN
CREATE TABLE mission2 (idMission integer primary key autoincrement, recursive boolean, nbPersAtteindre INT UNSIGNED, description varchar(666), lieu varchar(255), statut varchar(255), loginAsso varchar(100), foreign key(loginAsso) references association(loginAsso));
INSERT INTO mission2 SELECT idMission, recursive, nbPersAtteindre, description, lieu, statut, loginAsso FROM mission;
DROP TABLE mission;
ALTER TABLE mission2 RENAME TO mission;