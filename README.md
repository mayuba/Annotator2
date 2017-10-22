# Adnotatio
![Alt text](https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Fadno.svg?alt=media&token=2992a291-6958-4155-9282-6d37084d3b76)


## Conditions préalables
L'application est basé sur Angular-Cli V4
```
  npm install @angular/cli
  ```
### 1. Créer votre projet
```
  ng new <project-name>
  cd <project-name>
  ```
### 2. Installer AngularFire et Firebase
```
  npm install angularfire2 firebase --save
  ```
### 3. Configurer vos fichiers environment
```
  export const environment = {
    production: false,
    firebase: {
      apiKey: '<your-key>',
      authDomain: '<your-project-authdomain>',
      databaseURL: '<your-database-URL>',
      projectId: '<your-project-id>',
      storageBucket: '<your-storage-bucket>',
      messagingSenderId: '<your-messaging-sender-id>'
    }
  };
  ```
  ### 4. Installer Angular Material
  Le Material Design est un ensemble de règle de design pour les interfaces graphiques proposées par Google. Vous devrez installer la librairie à la page [Getting started](https://material.angular.io/guide/getting-started)
## AngularFirestore 
Ce projet a été réalisé avec la librairie angularfire2 V5, ce qui permet l’utilisation de collections offert par « Cloud Firestore ». Les données sont entreposées dans des documents organisés en collections. Chaque document contient un ensemble de paires clé-valeur.
* **administrateurs**
  *   id : "administrateur@uqo.ca"
  * data :
    * nom :
    * prenom :  
* **annotateurs** 
  * id : "administrateur@uqo.ca&annotateur@uqo.ca"
  * data : 
    * administrateur: "administrateur@uqo.ca"
    * courriel: "annotateur@uqo.ca"
    * nom : 
    * prenom :
    * projet : [ {projet1},{projet2},{projet3},...]   
* **uploads**
  * id : "nom_du_rapport.xml"
  * data : 
    * administrateur : "administrateur@uqo.ca"
    * createdAt : "date"
    * projet: "projet_X"
    * size : "xxx k"
    * url : "https://firebases"

## Structure de fichiers du projet
Dans Angular les modules sont statique et le mécanisme pour y injecter des données se fait par l’utilisation de services. Dans adnotatio, les services sont :
* annotateurs
* auth
* uploads
* projets
* administrateur

![Alt text](https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Farchi111%402x-100.jpg?alt=media&token=c0623ae4-fc0e-460b-ae6f-011d33afef4d)
## Build 
Exécutez `ng build` pour générer le projet. Les fichiers utilisé en production seront enregistrés dans le répertoire `dist /`. Les paramètres du build se trouvent dans le fichier firebase.json.

## Exécutez les tests unitaires
Exécutez `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io/1.0/index.html).

