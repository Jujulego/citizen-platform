## Installation :
Après avoir cloné le dépôt, **dans le dossier du dépôt**, exécutez le commande suivante dans un terminal :

    npm install

Cela va installer toutes les dépendances du serveur.

## Exécution :
Pour lancer le serveur, **dans le dossier du dépôt**, exécutez la commande suivante dans un terminal :

    npm start
    
Le site sera alors accessible à l'adresse http://localhost:3000.

## Dossiers
* *bin & node_modules* : A ignorer, ils contiennent toutes les dépendances
* *public* : contient les ressources (images, CSS, JS etc) côté **client**, les fichiers présents sont accessibles via l'url */static* (ex : le fichiers *public/js/accueil.js* sera accessible via l'url */static/js/accueil.js*)
* *src* : contient le code du **serveur**
* *templates* : contient les templates Pug

## Ressources
### Client :
* [Bootstrap 4](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
* [SCSS](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [JQuery](https://openclassrooms.com/fr/courses/1631636-simplifiez-vos-developpements-javascript-avec-jquery)
* [Leaflet](https://leafletjs.com/examples.html) (*Pour la carte*)

### Serveur :
* [Express](https://openclassrooms.com/fr/courses/1056721-des-applications-ultra-rapides-avec-node-js/1057503-le-framework-express-js)
* [Pug](https://pugjs.org/api/getting-started.html) (*Templates*)
* [SQLite3](http://www.sqlitetutorial.net/sqlite-nodejs/)