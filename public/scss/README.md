Toujours éditer les fichiers **.scss**, les **.css** sont générés : toute modification d'un **.css** sera perdue !
Par contre, il faut **toujours** indiquer l'url du **.css** dans les templates

#### Exemple
La feuille de style *public/scss/accueil.scss* sera utilisée ainsi :
```jade
link(rel="stylesheet", href="/static/scss/accueil.css")
```