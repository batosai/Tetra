---
id: installation
title: Installation
---

Manual module install

```
npx tetra install module-name
```


node 10 required for bcrypt

npx tetra install @tetrajs/webpack
npx tetra install @tetrajs/admin

npx tetra ca:c
npx tetra webpack
npx tetra assets

Ajouter des automatisme.
webpack, rep public/build


req.usersIndexSignInPath is not a function
route autre modules non accessible dans req
réflechir à une autre solution qui serait aussi utiliser dans une commande pour lister les routes

add .npmignore

créer des services
les commandes lancerait les services
créer des actions pour lancer mes commandes dans le code, cela facilitera les accès si nécessaire de vider le cache, installer le assets après install etc
exemple : cmd('module:install')
