## Routes
Pour ajouter une url dans un dossier existant :
1. Dans le fichier choisi, ajoutez ce qui suit:
    ```javascript
    router.get('**url**', function (req, res, next) {
        res.render('**nom du template pug**', {
            title: 'Express',
            connected: parseInt(req.signedCookies.connected)
        });
    });
    ```
2. Ne pas oublier de redémmarer le serveur ;)

Pour ajouter un *dossier* d'URLs, il faut respecter les étapes suivantes :
1. Créer un fichier **.js** dans le dossier *routes*
2. Copier le modèle ci-dessous :
    ```javascript
    const express = require('express');
    const router = express.Router();
    
    module.exports = function(db) { // <= la base de données est passée en paramètre
       // Ajouter les routes ici !
    
       return router;
    };
    ```
3. Dans **app.js** ajoutez (en adaptant les noms ;) ):
    * En haut du fichier
        ```javascript
        const indexRouter = require('./routes/index');
        ```
    * Au millieu du fichier (juste au dessus de *// catch 404 and forward to error handler*)
        ```javascript
        app.use('/', indexRouter(database));
        ```
4. Ne pas oublier de redémmarer le serveur ;)