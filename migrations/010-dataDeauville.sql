-- UP
-- Exemples

--INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('charlesdu33@gmail.fr', 'charles123', 'Denis', 'Charles', '28 boulevard d''Aix', '0680458156', '5', '1');
--INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`) VALUES ('restoducoeur@yahoo.fr', 'cmmdp', 'Les Resto du Coeur', '55 rue Voltaire', 'restoducoeur.contact@yahoo.fr', '0122334455', 'restoducoeur.org');
--insert into postulation(creneau, citoyen) values (01, 'charlesdu33@gmail.fr');
--INSERT INTO `disponibiliteCitoyen` (`recursif`, `tranche`, `dateDispo`, `loginCitoyen`) VALUES ('1', 'après-midi', '2019-02-05', 'solenedu93@gmail.com');

/*
insert into creneau_citoyen values (null, ?, ?, ?, ?, ?)
insert into creneau_mission values (null, ?, ?, ?, ?, ?)
-- insert into document values (null, ?, ?, ?)
insert into domaineIntervention values (null, ?, ?)
insert into mission values (null, ?, ?, ?, ?, ?)
*/

delete from `citoyen`;
delete from `mission`;
delete from `association`;
delete from `creneau_citoyen`;
delete from `creneau_mission`;
delete from `document`;
delete from `postulation`;
delete from `domaine`;
delete from `domaine_mission`;


-- Citoyen
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('charlesdu33@gmail.fr', 'charles123', 'Denis', 'Charles', '28 boulevard d''Aix', '0680458156', '5', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('claude.dupond@gmail.com', 'NomoreIdea', 'Dupond', 'Claude', '89 rue de lEglise', '0126622661', '7', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('alexandre.lorant@gmail.com', 'password', 'Lorant', 'Alexandre', '5 rue de Venise', '0129329391', '1', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('mariannedelachaud@gmail.com', '123456789', 'Delachaud', 'Marianne', '2 Avenue de la Bastille', '0153355331', '2', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('marie.foulcaud@gmail.com', 'casper', 'Foucauld', 'Marie', '2 Avenue de la Frisse', '0153355322', '8', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('auritesla@gmail.com', 'tesla12', 'Tesla', 'Auri', '34 rue du navire', '0553355331', '1', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('juliendedeauville@gmail.com', 'jujudedeauville', 'Delachaud', 'Julien', '2 Avenue Jaubert', '0153352234', '4', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('amoryrichard@gmail.com', 'momo12momo', 'Richard', 'Amory', '24 Avenue Jaubert', '0153668978', '5', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('jeanpoupidou@yahoo.com', 'poupoudidou', 'Boudon', 'Jean', '44 Avenue de la Bastille', '0153110987', '6', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('moricedelasale@gmail.com', 'password', 'Delassale', 'Maurice', '2 Avenue de la Guerre', '01009985331', '8', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('ninondeauville@gmail.com', 'ninooo', 'Portier', 'Ninon', '2 Avenue de la Mer', '0153678909', '2', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('solenedu93@gmail.com', '11soleil11', 'Vachez', 'Solene', '2 Avenue de la Marine', '0254670956', '7', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('alicebouchez@gmail.com', 'inwonderland', 'Bouchez', 'Alice', '6 rue du four', '0177668945', '2', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('aurore.audin@gmail.com', 'aube00!!', 'Audin', 'Aurore', '7 rue du Bocage', '0153355335', '1', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('samcaudwel@gmail.com', 'samsam', 'Caudwel', 'Sam', '4 rue du Bosquet', '0153355331', '3', '1');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('christinedujet@gmail.com', 'Rodolph', 'Dujet', 'Christine', '2 rue du navire', '0127653897', '6', '0');
INSERT INTO `citoyen` (`loginCitoyen`, `mdpCitoyen`, `nom`, `prenom`, `adresse`, `tel`, `situation`, `permis`) VALUES ('martinmontou@gmail.com', 'solei198', 'Montou', 'Martin', '67 Avenue Jaubert', '0156870934', '3', '1');


-- Association
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('restoducoeur@yahoo.fr', 'cmmdp', 'Les Resto du Coeur', '3 Rue des Ouvres, 14800 Deauville, France', 'restoducoeur.contact@yahoo.fr', '0122334455', 'restoducoeur.org', 'La générosité des donateurs est essentielle pour le fonctionnement des Restos. Sans les dons, nous ne pourrions par assurer nos missions sociales.', '950638592');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('greenpeace@hotmail.com', 'PeaceAndLove', 'GreenPeace', '25 Avenue des Courses, 14800 Deauville, France', 'greenpeace.contact@hotmail.com', '0123456789', 'greenpeace.fr', 'Greenpeace est une ONGI de protection de l''environnement présente dans plus de 55 pays à travers le monde.', '347659876');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('actioncontrelafaim@hotmail.com', 'ImNotHungry', 'Action contre la Faim', '4 Rue des Villas, 14800 Deauville, France', 'actioncontrelafaim.contact@hotmail.com', '0122344566', 'actioncontrelafaim.fr', 'Action contre la faim est une organisation humanitaire crée en 1979 par un groupe d''intellectuels comprenant notamment Alfred Kastler, Bernard-Henri Lévy, Jacques Attali, Françoise Giroud, Marek Halter et Jean-Christophe Victor.', '985555857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('deauvillegreenawards@yahoo.com', 'greenawards', 'Deauville Green Awards', '15 Rue de Gheest, 14800 Deauville, France', 'deauvillegreenawards.contact@yahoo.com', '0645876499', 'www.deauvillegreenawards.com/fr/', 'Festival international des productions audiovisuelles pour le développement durable et les eco-innovations.', '678907857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('gazellesdeauville@yahoo.com', 'gazelles', 'Les gazelles de Deauville', '12 Rue Merigault, 14800 Deauville, France', 'gazellesdeauville@yahoo.com', '0645876493', 'lesgazellesdedeauville.net', 'Deux grandes amies ont eu l''envie folle de participer au Rallye Aïcha des Gazelles... Partagez notre rêve !', '246809098');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('deauvillefestival@gmail.com', 'festivalUS', 'Deauville Festival du Film Americain', '2 Rue Letellier, 14800 Deauville, France', 'deauvillefestival.aboutus@gmail.com', '0621876499', 'www.deauvillefestivalamericain.com', 'Le Festival du cinéma américain de Deauville est un festival de cinéma créé en 1975 et consacré au cinéma américain. Il a été fondé par Lionel Chouchan et André Halimi, avec l''aide financière du groupe Lucien Barrière et de la ville de Deauville, alors dirigée par Michel d''Ornano.', '9875678857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('aeroclubdeauville@yahoo.com', 'avion', 'Aeroclub de Deauville', '12 Rue Jules Saucisse, 14800 Deauville, France', 'aeroclubdeauville@yahoo.com', '0645876400', 'www.aeroclubdeauville.com', 'L''aéroclub de Deauville ou « ACDEAUVILLE » vous propose une multitude d''activitées liées au domaine aéronautique', '246834567');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('deauvilleyachtclub@gmail.com', 'bateau', 'Deauville Yacht Club', '1 Rue du Moulin Saint-Laurent, 14800 Deauville, France', 'deauvilleyachtclub@gmail.com', '0645876411', 'www.deauvilleyachtclub.com', 'Mettez les voiles avec le Deauville Yacht Club ! Embarquez pour une sortie en mer.', '987657857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('deauvillenautisme@yahoo.com', 'nautisme', 'Deauville Nautisme', '86 Rue Gambetta, 14800 Deauville, France', 'deauvillenautisme@yahoo.com', '0645871199', 'deauvillenautisme.com', 'Situé dans le 14 dans la région de Deauville.', '199907857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('triathlondeauville@yahoo.com', 'trois333', 'Triathlon Deauville', '4 Rue de l''Avenir, 14800 Deauville, France', 'triathlondeauville@yahoo.com', '0645876433', 'www.triathlondeauville.com', 'La 8ème édition du Triathlon International de Deauville aura lieu du 21 au 23 juin 2019. Rendez-vous pour le plus grand triathlon de France !', '246876543');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('deauville.eema@gmail.com', 'passeema', 'EEMA', '25 Rue Breney, 14800 Deauville, France', 'deauville.eema@gmail.com', '0645349812', 'www.eema.fr', 'EEMA 2019 Deauville France. Conférence des Echanges de Jeunes', '246807098');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('pokerdeauville@yahoo.com', 'money', 'Poker Deauville', '18 Rue Olliffe, 14800 Deauville, France', 'pokerdeauville@yahoo.com', '0645876499', 'pokerdeauville.com', 'Association de poker', '246679857');
INSERT INTO `association` (`loginAsso`, `mdpAsso`, `nom`, `adresse`, `mail`, `tel`, `siteWeb`, 'presentation', 'siret') VALUES ('lyceemaurois@yahoo.com', 'savoir', 'Lycée Collège André Maurois', '1 Rue Robert Fossorier, 14800 Deauville, France', 'lycee.maurois.info@yahoo.com', '0645876490', 'maurois-deauville.etab.ac-caen.fr', 'Activitées du lycée et college Maurois de Deauville', '246807123');



-- Mission 
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0001', '2', 'Soutien scolaire pour les élèves de 4ème en maths et physique', '10 Boulevard Eugène Cornuche, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0002', '1', 'Soutien scolaire pour les élèves de 5ème en français', '1 Boulevard Eugène Cornuche, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0036', '2', 'Soutien scolaire pour les élèves de 6ème en maths', '1 rue Raspail, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0037', '2', 'Soutien scolaire pour les élèves de 4ème en anglais', '3 rue des lavandières, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0038', '2', 'Soutien scolaire pour les élèves de 5ème en maths et physique', '5 rue du val fleuri, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0039', '2', 'Soutien scolaire pour les élèves de 6ème en français', '7 rue Pasteur, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0040', '2', 'Soutien scolaire pour les élèves de 1ère en philosophie', '5 rue Victor Hugo, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0003', '10', 'Ramassage d''ordure sur les plages de Deauville (bouteilles en plastique, sacs, ...)', '50 rue Victor Hugo, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Ramassage d''ordure');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0004', '10', 'Ramassage d''ordure dans la foret (bouteilles en plastique, sacs, ...)', '20 rue Victor Hugo, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Ramassage d''ordure');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0005', '4', 'Collecte de nourriture pour ensuite la redistribuer. Devant les supermarchés (conserves, riz, fruits et légumes ...)', '10 Avenue de la République, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Collecte de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0006', '3', 'Collecte de vetements pendant une après-midi.', '30 Avenue de la République, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Collect de vetement');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0007', '3', 'Collecte de nourriture pour ensuite la redistribuer. Devant les supermarchés (conserves, riz, fruits et légumes ...)', '60 Avenue de la République, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Collecte de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0008', '6', 'Marraude avec UPA-ECE pour redistribuer la nourriture collectée lors de missions précédentes', '80 Avenue de la République, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Marraude avec UPA-ECE');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0009', '10', 'Collecte de nourriture pour ensuite la redistribuer. Devant les supermarchés (conserves, riz, fruits et légumes ...)', '100 Avenue de la République, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Collecte de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0010', '10', 'Ramassage d''ordure dans le port de Deauville (bouteilles en plastique, sacs, ...)', '180 Avenue de la République, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Ramassage d''ordure');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0011', '5', 'Nettoyer le vielle avion situé derrière le garage pour qu''il serve de modele pour le calandrier vendu lors de la collecte de fond.', '25 Boulevard Mauger, 14800 Deauville, France', 'aeroclubdeauville@yahoo.com', 'Modele pour calendrier');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0012', '10', 'Collecte de plastique en mer grace au bateau de l''association (bouteilles en plastique, sacs, ...)', '5 Boulevard Mauger, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Ramassage d''ordure');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0013', '3', 'Collecte de nourriture pour ensuite la redistribuer. Devant les supermarchés (conserves, riz, fruits et légumes ...)','1 Boulevard Mauger, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Collecte de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0014', '4', 'Atelier d''art plastique pour les élèves de 6ème', '1 Rue Désiré le Hoc, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0015', '4', 'Atelier d''art plastique pour les élèves de 5ème', '10 Rue Désiré le Hoc, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0016', '4', 'Atelier d''art plastique pour les élèves de 4ème', '200 Avenue de la République, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0017', '4', 'Atelier d''art plastique pour les élèves de 3ème', '40 Rue Désiré le Hoc, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Soutien scolaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0018', '7', 'Aider la croix rouge à organiser un dont du sang.', '2 Avenue de la République, 14800 Deauville, France', 'triathlondeauville@yahoo.com', 'Don du sang');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0019', '4', 'Aider à l''organisation. Distribuer la nourriture', '200 Boulevard Eugène Cornuche, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Soupe populaire');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0020', '4', 'Marraude avec UPA-ECE pour redistribuer la nourriture collectée lors de missions précédentes', '100 Boulevard Eugène Cornuche, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Marraude avec UPA-ECE');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0021', '4', 'Ramassage d''ordure sur les plages de Deauville (bouteilles en plastique, sacs, ...)', '1 rue de la mer, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Dépollution');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0022', '3', 'Collecte de nourriture pour ensuite la redistribuer. Devant les supermarchés (conserves, riz, fruits et légumes ...)','150 Boulevard Eugène Cornuche, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Collecte de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0023', '3', 'Distribution de nourriture devant la place de la mairie','5 Rue du Stade, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Distribution de nourriture');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0024', '3', 'Distribution de produit dhygiène devant la place de la mairie','20 Rue Jean Jaurès, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Distribution de produit dhygiène');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0025', '2', 'Distribution de vetement devant la place de la mairie','2 Rue Fernand Truffaut, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Distribution de vetement');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0026', '1', 'Réunir assez de fond pour pouvoir financer 5 nouveaux optimites pour les enfants du samedi matin.','1 Rue du Dr Ebrard, 14800 Deauville, France', 'deauvillenautisme@yahoo.com', 'Collecte de Fond');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0027', '1', 'Réunir assez de fond pour aider à la rénovation de l''ancienne salle de cinéma.', '22 Chemin de l''Aumône, 14800 Deauville, France', 'deauvillefestival@gmail.com', 'Collecte de Fond');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0028', '1', 'Réunir assez de fond pour aider à la rénovation du chassis des Gazelles','1 Chemin de l''Aumône, 14800 Deauville, France', 'gazellesdeauville@yahoo.com', 'Collecte de Fond');


INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0029', '3', 'Nous recherchons plusieurs bénévoles pour soutenir une personne âgées habitant à Deauville et qui rend visite chaque jour à son fils handicapé moteur accueilli dans un établissement spécialisé. Les bénévoles soutiendront la mère dans ses visites, lectures, sorties en fauteuil roulant. Ces visites permettent de stimuler le fils afin de mobiliser au maximum ses capacités. ','15 Chemin de l''Aumône, 14800 Deauville, France', 'lyceemaurois@yahoo.com', 'Aide à personne handicapée');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0030', '4', 'La mission consiste à accompagner nos aînés dans leurs déplacements de proximité (une balade dans le quartier, une sortie au musée, un rendez-vous médical...). Les accompagnements peuvent avoir lieu du lundi au dimanche, dans tout Deauville.','1 Rue du Moulin Saint-Laurent, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Aide aux personnes agées');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0031', '5', '1 dimanche matin par mois (hors vacances scolaires),au sein de l''équipe de bénévoles, vous participerez à l''accueil et à l''information des personnes avec et sans handicap au cinéma Majestic. Pendant le film, les bénévoles sont répartis dans la salle, afin de pouvoir anticiper et accompagner les réactions des spectateurs.','10 Rue du Moulin Saint-Laurent, 14800 Deauville, France', 'deauvillefestival@gmail.com', 'Collecte de Fond');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0032', '3', 'Visite des déficients visuels (aveugles, malvoyants...) à leur domicile pour passer un moment avec eux et les aider dans diverses tâches : lecture, aide pour leurs courriers administratifs...(pas d''aide ménagère).','2 Rue Jean Jaurès, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Distribution de produit dhygiène');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0033', '3', 'Nous recherchons des bénévoles pour le service d''urgence de l''hôpital Pitié Salpétrière. Vous accueillerez les personnes qui arrivent dans ce service aussi bien les patients que les accompagnants, les ferez patienter, les rassurerez....... Nous avons besoin de vous les mardi ou jeudi ou samedi de 15h à 18h ou les lundi ou mardi ou jeudi de 18h à 20 h30','44 Rue des Aunes, 14800 Deauville, France', 'actioncontrelafaim@hotmail.com', 'Distribution de produit dhygiène');
INSERT INTO `mission` (`idMission`, `nbPersAtteindre`, `description`, `lieu`, `loginAsso`, 'titre') VALUES ('0034', '3', 'Pour gonfler notre bulle créative, nous recherchons ponctuellement des bénévoles qui participeront à l''animation culturelle de l''association. Nos champs d''action ? De l''accompagnement à la scolarité, des ateliers ludiques et créatifs et notre nouvelle web radio, la radio du 12ème. Et plein d''autres projets encore...! Allez viens, on est bien ! Et c''est sans engagement !','2 Impasse du Moulin Saint-Laurent, 14800 Deauville, France', 'greenpeace@hotmail.com', 'Distribution de produit dhygiène');







-- Dispo citoyen
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (1,'2019-02-05 14:00:00', '2019-02-05 17:00:00', '13', '7', 'christinedujet@gmail.com');
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (2,'2019-02-03 14:00:00', '2019-02-03 17:00:00', '13', '1', 'christinedujet@gmail.com');
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (3,'2019-02-09 14:00:00', '2019-02-09 17:00:00', '0',  '28', 'christinedujet@gmail.com');
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (4,'2019-01-30 9:00:00',  '2019-02-09 11:00:00', '0',  '7', 'samcaudwel@gmail.com');
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (5,'2018-12-31 9:00:00',  '2019-01-04 17:00:00', '52', '7', 'alicebouchez@gmail.com');
insert into creneau_citoyen(id, debut, fin, repetitions, ecart, citoyen) values (6,'2019-03-01 14:00:00', '2019-03-01 17:00:00', '4',  '1', 'solenedu93@gmail.com');
-- avec des valeurs par defauts
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 9:00:00',  '2019-02-02 11:00:00', 'christinedujet@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-02 14:00:00', '2019-02-02 17:00:00', 'christinedujet@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-04-25 14:00:00', '2019-02-25 17:00:00', 'samcaudwel@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-01-30 9:00:00',  '2019-01-30 11:00:00', 'samcaudwel@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-01 9:00:00',  '2019-02-01 11:00:00', 'samcaudwel@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-05 20:00:00', '2019-03-05 22:00:00', 'alicebouchez@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 9:00:00',  '2019-03-12 11:00:00', 'alicebouchez@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-12 14:00:00', '2019-03-12 17:00:00', 'alicebouchez@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-02-18 14:00:00', '2019-02-18 17:00:00', 'solenedu93@gmail.com');
insert into creneau_citoyen(debut, fin, citoyen) values ('2019-03-30 14:00:00', '2019-03-30 17:00:00', 'solenedu93@gmail.com');


-- Date Mission
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (1,'2019-05-19 15:30:00', '2019-05-19 18:00:00', 2, 1, 38);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (2,'2019-05-10 14:15:00', '2019-05-10 16:15:00', 2, 1, 39);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (3,'2019-05-05 10:30:00', '2019-05-05 12:00:00', 2, 1, 01);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (4,'2019-05-12 10:30:00', '2019-05-12 14:00:00', 1, 0, 02);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (5,'2019-05-01 15:30:00', '2019-05-01 18:00:00', 2, 2, 02);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (6,'2019-05-14 11:30:00', '2019-05-14 13:00:00', 0, 7, 37);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (7,'2019-05-16 15:30:00', '2019-05-16 17:30:00', 0, 7, 02);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (8,'2019-03-22 12:30:00', '2019-03-22 15:00:00', 0, 7, 01);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (9,'2019-03-30 10:30:00', '2019-03-30 15:00:00', 3, 7, 036);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (10,'2019-03-05 12:30:00', '2019-03-05 15:00:00', 3, 7, 08);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (11,'2019-04-04 15:30:00', '2019-04-04 17:30:00', 2, 1, 07);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (12,'2019-02-22 12:30:00', '2019-02-22 15:00:00', 1, 0, 06);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (13,'2019-02-24 15:30:00', '2019-02-24 17:30:00', 14, 7, 40);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (14,'2019-02-26 14:30:00', '2019-02-26 17:00:00', 14, 7, 05);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (15,'2019-02-27 14:30:00', '2019-02-27 17:00:00', 14, 7, 01);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (16,'2019-02-28 14:30:00', '2019-02-28 17:00:00', 14, 7, 02);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (17,'2019-02-29 14:30:00', '2019-02-29 17:00:00', 14, 7, 03);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (18,'2019-02-20 14:30:00', '2019-02-20 17:00:00', 14, 7, 04);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (19,'2019-02-21 14:30:00', '2019-02-21 17:00:00', 14, 7, 05);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (20,'2019-02-22 14:30:00', '2019-02-22 17:00:00', 14, 7, 06);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (21,'2019-02-23 14:30:00', '2019-02-23 17:00:00', 14, 7, 07);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (22,'2019-02-24 14:30:00', '2019-02-24 17:00:00', 14, 7, 08);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (23,'2019-02-25 14:30:00', '2019-02-25 17:00:00', 14, 7, 09);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (24,'2019-02-26 14:30:00', '2019-02-26 17:00:00', 14, 7, 10);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (25,'2019-02-27 14:30:00', '2019-02-27 17:00:00', 14, 7, 11);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (26,'2019-02-28 14:30:00', '2019-02-28 17:00:00', 14, 7, 12);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (27,'2019-02-29 14:30:00', '2019-02-29 17:00:00', 14, 7, 13);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (28,'2019-04-25 14:30:00', '2019-04-25 17:00:00', 14, 7, 14);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (29,'2019-04-21 14:30:00', '2019-04-21 17:00:00', 14, 7, 15);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (30,'2019-04-22 14:30:00', '2019-04-22 17:00:00', 14, 7, 16);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (31,'2019-04-23 14:30:00', '2019-04-23 17:00:00', 14, 7, 17);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (32,'2019-04-24 14:30:00', '2019-04-24 17:00:00', 14, 7, 18);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (33,'2019-04-25 14:30:00', '2019-04-25 17:00:00', 14, 7, 19);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (34,'2019-04-26 14:30:00', '2019-04-26 17:00:00', 14, 7, 20);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (35,'2019-04-27 14:30:00', '2019-04-27 17:00:00', 14, 7, 21);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (36,'2019-04-28 14:30:00', '2019-04-28 17:00:00', 14, 7, 22);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (37,'2019-04-29 14:30:00', '2019-04-29 17:00:00', 14, 7, 23);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (38,'2019-04-30 14:30:00', '2019-04-30 17:00:00', 14, 7, 24);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (39,'2019-06-25 14:30:00', '2019-06-25 17:00:00', 14, 7, 25);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (40,'2019-06-25 14:30:00', '2019-06-25 17:00:00', 14, 7, 26);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (41,'2019-06-25 14:30:00', '2019-06-25 17:00:00', 14, 7, 27);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (42,'2019-05-21 14:30:00', '2019-05-21 17:00:00', 14, 7, 28);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (43,'2019-05-22 14:30:00', '2019-05-22 17:00:00', 14, 7, 37);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (44,'2019-05-23 14:30:00', '2019-05-23 17:00:00', 14, 7, 38);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (45,'2019-05-24 14:30:00', '2019-05-24 17:00:00', 14, 7, 39);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (46,'2019-05-25 14:30:00', '2019-05-25 17:00:00', 14, 7, 40);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (47,'2019-05-26 14:30:00', '2019-05-26 17:00:00', 14, 7, 40);


insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (48,'2019-04-11 14:30:00', '2019-04-11 17:00:00', 14, 7, 29);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (49,'2019-04-11 14:30:00', '2019-04-11 17:00:00', 14, 7, 30);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (50,'2019-04-11 14:30:00', '2019-04-11 17:00:00', 14, 7, 31);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (51,'2019-04-12 14:30:00', '2019-04-12 17:00:00', 14, 7, 32);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (52,'2019-04-12 14:30:00', '2019-04-12 17:00:00', 14, 7, 33);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (53,'2019-04-12 14:30:00', '2019-04-12 17:00:00', 14, 7, 34);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (54,'2019-04-12 12:30:00', '2019-04-12 16:00:00', 14, 7, 29);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (55,'2019-04-12 12:30:00', '2019-04-12 16:00:00', 14, 7, 30);
insert into creneau_mission(id, debut, fin, repetitions, ecart, mission) VALUES (56,'2019-04-12 12:30:00', '2019-04-12 16:00:00', 14, 7, 31);




-- Document
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv1.jpg', 'charlesdu33@gmail.fr');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv2.jpg', 'martinmontou@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'Lettre de motivation', 'lettre2.pdf', 'christinedujet@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv3.jpg', 'samcaudwel@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv4.jpg', 'aurore.audin@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv5.jpg', 'alicebouchez@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv6.jpg', 'solenedu93@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv7.jpg', 'ninondeauville@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv8.jpg', 'juliendedeauville@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv9.jpg', 'auritesla@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'CV', 'cv10.jpg', 'claude.dupond@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'Bafa', 'bafa.jpg', 'solenedu93@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'Bafa', 'bafa2.jpg', 'alicebouchez@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'Bafa', 'bafa.jpg', 'samcaudwel@gmail.com');
INSERT INTO `document` (`id`, `titre`, `fichier`, `citoyen`) VALUES (null, 'Bafa', 'bafa2.jpg', 'christinedujet@gmail.com');



-- Lien mission & citoyen
insert into postulation(creneau, citoyen) values (09, 'martinmontou@gmail.com');
insert into postulation(creneau, citoyen) values (10, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (14, 'samcaudwel@gmail.com');
insert into postulation(creneau, citoyen) values (07, 'samcaudwel@gmail.com');
insert into postulation(creneau, citoyen) values (3,  'ninondeauville@gmail.com');
insert into postulation(creneau, citoyen) values (03, 'aurore.audin@gmail.com');
insert into postulation(creneau, citoyen) values (10, 'solenedu93@gmail.com');
insert into postulation(creneau, citoyen) values (01, 'ninondeauville@gmail.com');
insert into postulation(creneau, citoyen) values (10, 'martinmontou@gmail.com');
insert into postulation(creneau, citoyen) values (08, 'martinmontou@gmail.com');
insert into postulation(creneau, citoyen) values (11, 'aurore.audin@gmail.com');
insert into postulation(creneau, citoyen) values (02, 'alicebouchez@gmail.com');
insert into postulation(creneau, citoyen) values (4,  'aurore.audin@gmail.com');
insert into postulation(creneau, citoyen) values (04, 'ninondeauville@gmail.com');
insert into postulation(creneau, citoyen) values (05, 'alicebouchez@gmail.com');
insert into postulation(creneau, citoyen) values (06, 'alicebouchez@gmail.com');
insert into postulation(creneau, citoyen) values (09, 'aurore.audin@gmail.com');
insert into postulation(creneau, citoyen) values (12, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (17, 'samcaudwel@gmail.com');
insert into postulation(creneau, citoyen) values (13, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (1, 'solenedu93@gmail.com');
insert into postulation(creneau, citoyen) values (2, 'martinmontou@gmail.com');
insert into postulation(creneau, citoyen) values (3, 'samcaudwel@gmail.com');
insert into postulation(creneau, citoyen) values (4, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (24, 'samcaudwel@gmail.com');
insert into postulation(creneau, citoyen) values (6, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (7, 'ninondeauville@gmail.com');
insert into postulation(creneau, citoyen) values (8, 'ninondeauville@gmail.com');
insert into postulation(creneau, citoyen) values (9, 'christinedujet@gmail.com');
insert into postulation(creneau, citoyen) values (10, 'alicebouchez@gmail.com');
insert into postulation(creneau, citoyen) values (11, 'martinmontou@gmail.com');
insert into postulation(creneau, citoyen) values (12, 'solenedu93@gmail.com');
insert into postulation(creneau, citoyen) values (13, 'solenedu93@gmail.com');



-- Domaine d'intervention
insert into domaine(id, nom) values (1, 'Agriculture');
insert into domaine(id, nom) values (2, 'Alimentation');
insert into domaine(id, nom) values (3, 'Aide publique');
insert into domaine(id, nom) values (4, 'Commerce équitable');
insert into domaine(id, nom) values (5, 'Culture');
insert into domaine(id, nom) values (6, 'Communication');
insert into domaine(id, nom) values (7, 'Développement économique et local');
insert into domaine(id, nom) values (8, 'Droits');
insert into domaine(id, nom) values (9, 'Eau et l’assainissement');
insert into domaine(id, nom) values (10, 'Education et la formation');
insert into domaine(id, nom) values (11, 'Education au développement');
insert into domaine(id, nom) values (12, 'Le Genre');
insert into domaine(id, nom) values (13, 'Habitat');
insert into domaine(id, nom) values (14, 'Loisir');
insert into domaine(id, nom) values (15, 'Microcrédit');
insert into domaine(id, nom) values (16, 'Santé');
insert into domaine(id, nom) values (17, 'Sport');
insert into domaine(id, nom) values (18, 'Volontariat');





-- Lien Domaine d'intervention-Mission
insert into domaine_mission(domaine, mission) values (10, 36);
insert into domaine_mission(domaine, mission) values (10, 37);
insert into domaine_mission(domaine, mission) values (10, 38);
insert into domaine_mission(domaine, mission) values (10, 39);
insert into domaine_mission(domaine, mission) values (10, 40);
insert into domaine_mission(domaine, mission) values (10, 1);
insert into domaine_mission(domaine, mission) values (10, 2);
insert into domaine_mission(domaine, mission) values (18, 3);
insert into domaine_mission(domaine, mission) values (2, 5);
insert into domaine_mission(domaine, mission) values (18, 6);
insert into domaine_mission(domaine, mission) values (2, 7);
insert into domaine_mission(domaine, mission) values (2, 8);
insert into domaine_mission(domaine, mission) values (2, 9);
insert into domaine_mission(domaine, mission) values (2, 10);
insert into domaine_mission(domaine, mission) values (18, 11);
insert into domaine_mission(domaine, mission) values (18, 12);
insert into domaine_mission(domaine, mission) values (18, 13);
insert into domaine_mission(domaine, mission) values (18, 14);
insert into domaine_mission(domaine, mission) values (18, 15);
insert into domaine_mission(domaine, mission) values (18, 16);
insert into domaine_mission(domaine, mission) values (18, 17);
insert into domaine_mission(domaine, mission) values (18, 18);
insert into domaine_mission(domaine, mission) values (18, 19);
insert into domaine_mission(domaine, mission) values (18, 20);
insert into domaine_mission(domaine, mission) values (18, 21);
insert into domaine_mission(domaine, mission) values (18, 22);
insert into domaine_mission(domaine, mission) values (18, 23);
insert into domaine_mission(domaine, mission) values (18, 24);
insert into domaine_mission(domaine, mission) values (18, 25);
insert into domaine_mission(domaine, mission) values (18, 26);
insert into domaine_mission(domaine, mission) values (18, 27);
insert into domaine_mission(domaine, mission) values (18, 28);




insert into competance(idCompetance, nom, description, loginCitoyen) values (1, 'Pack Office', 'Word, Excel, PowerPoint...', 'charlesdu33@gmail.fr');
insert into competance(idCompetance, nom, description, loginCitoyen) values (2, 'Pack Office', 'Word, Excel, PowerPoint...', 'claude.dupond@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (3, 'Pack Office', 'Word, Excel, PowerPoint...', 'alexandre.lorant@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (4, 'Pack Office', 'Word, Excel, PowerPoint...', 'mariannedelachaud@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (5, 'Pack Office', 'Word, Excel, PowerPoint...', 'marie.foulcaud@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (6, 'Pack Office', 'Word, Excel, PowerPoint...', 'auritesla@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (7, 'Pack Office', 'Word, Excel, PowerPoint...', 'juliendedeauville@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (8, 'Pack Office', 'Word, Excel, PowerPoint...', 'amoryrichard@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (9, 'Pack Office', 'Word, Excel, PowerPoint...', 'jeanpoupidou@yahoo.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (10, 'Pack Office', 'Word, Excel, PowerPoint...', 'moricedelasale@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (11, 'Pack Office', 'Word, Excel, PowerPoint...', 'ninondeauville@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (12, 'Pack Office', 'Word, Excel, PowerPoint...', 'solenedu93@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (13, 'Pack Office', 'Word, Excel, PowerPoint...', 'alicebouchez@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (14, 'Pack Office', 'Word, Excel, PowerPoint...', 'aurore.audin@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (15, 'Pack Office', 'Word, Excel, PowerPoint...', 'samcaudwel@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (16, 'Pack Office', 'Word, Excel, PowerPoint...', 'christinedujet@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (17, 'Pack Office', 'Word, Excel, PowerPoint...', 'martinmontou@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (18, 'Encadrer les jeunes', 'J''ai mon BAFA depuis 4 ans', 'martinmontou@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (19, 'Encadrer les jeunes', 'J''ai mon BAFA depuis 4 ans', 'christinedujet@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (20, 'Encadrer les jeunes', 'J''ai mon BAFA depuis 4 ans', 'samcaudwel@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (21, 'Encadrer les jeunes', 'J''ai mon BAFA depuis 4 ans', 'aurore.audin@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (22, 'Encadrer les jeunes', 'J''ai mon BAFA depuis 4 ans', 'alicebouchez@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (23, 'Natation', 'Je suis certifié à donner des cours des natations aux enfants', 'alicebouchez@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (24, 'Natation', 'Je suis certifié à donner des cours des natations aux enfants', 'samcaudwel@gmail.com');
insert into competance(idCompetance, nom, description, loginCitoyen) values (25, 'Natation', 'Je suis certifié à donner des cours des natations aux enfants', 'solenedu93@gmail.com');






-- DOWN












/*
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
*/