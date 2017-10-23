![Alt text](https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Fadno.svg?alt=media&token=2992a291-6958-4155-9282-6d37084d3b76)

<h3 align="center">Adnotatio</h3>
<p align="center"><b>Version :</b> 1.0  - <b>Status :</b> En cours</p>


## Table des matières
1. [Information sur le produit](#infos)
1. [Résumé des fonctionnalités](#fonctionnalites)
1. [Installation et démarrage](#installation)
1. [Structure des fichiers](#structure)
1. [Documentation, rapports de bugs & accès à l'application](#docs)
1. [Créateurs](#createurs)

<a id="infos"></a>
## 1. Information sur le produit
Adnotatio est un outil permettant d'annoter des fichiers textes et de modifier des fichiers précédemment annotés au travers d'un interface graphique simplifiée. Adnotatio permet de regrouper des fichiers textes et annotés au sein de projets d'annotations, qui peuvent être gérés par des administrateurs et modifiés par des annotateurs contributeurs. Les fichiers générés par l'outil sont des fichiers d'extension .xmi facilement exportables.   

<a id="fonctionnalites"></a>
## 2. Résumé des fonctionnalités
* **Création et configuration de projet d'annotations**<br />Il est possible de créer son projet d'annotation pour regrouper son corpus au même endroit. Pour rendre l'annotation possible, il est nécessaire d'ajouter les catégories d'annotations ainsi que les annotateurs qui auront accès aux fichiers.  
* **Téléversement et téléchargement de corpus**<br />Pour chaque projet d'annotation, il est possible de créer un corpus en téléversant des fichiers textes et même des fichiers XML d'extension .xmi. À n'importe quel instant, il est aussi possible d'exporter ce corpus.  
* **Annotation de documents**<br />Une interface d'annotation est disponible sur Adnotatio, permettant d'ajouter, de modifier et de supprimer des annotations d'un fichier en performant une sélection de texte.
* **Espace de travail administrateurs**<br />Pour les administrateurs système et administrateurs de projet, un espace réservé est disponible pour gérer les annotateurs, administrateurs et fichiers de chaque projet.

<a id="installation"></a>
## 3. Installation et démarrage

### 3.0. Préalables
L'application nécessite l'installation de Angular-ClI V4.
```
  npm install @angular/cli
  ```

### 3.1. Création du projet
```
  ng new <project-name>
  cd <project-name>
  ```
  
### 3.2. Installation d'AngularFire et de Firebase
```
  npm install angularfire2 firebase --save
  ```
  
### 3.3. Configuration des fichiers `environment`
Il est nécessaire de définir chaque environnement de travail (développement, production) du projet sous le répertoire `/src/environments`, où :
- `<your-key>` :
- `<your-project-authdomain>` :
- `<your-database-URL>` :
- `<your-project-id>` :
- `<your-project-id>` :
- `<your-storage-bucket>` :
- `<your-messaging-sender-id>` :

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
  
### 3.4. Installation d'Angular Material
Le Material Design est un ensemble de règles de design pour les interfaces graphiques proposées par Google. Vous devrez installer la librairie à l'aide du [guide d'installation](https://material.angular.io/guide/getting-started).

### 3.5. Démarrage 
Exécutez `ng build` pour générer le projet. Les fichiers utilisés en production seront enregistrés dans le répertoire `/dist`. Les paramètres du build se trouvent dans le fichier `firebase.json`.

### 3.6. Démarrage des tests unitaires
Exécutez `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io/1.0/index.html).

<a id="structure"></a>
## 4. Structure des fichiers

### 4.1. Structure du projet
```
Annotator2/                   -- root du projet avec fichiers docs
├── e2e/
└── src/                      -- code du programme
    ├── app/                  -- pages de l'application et leurs tests
    │	├── administrateur/
    │	├── apercu/
    │	├── home/
    │	├── login/
    │	├── page-not-found/
    │	└── shared/
    ├── assets/               -- fichiers ressources
    └── environments/         -- description des environnements (prod, dev)
```

### 4.2. Division des modules
Dans Angular, les modules sont statiques. Le mécanisme pour injecter des données dans un module se fait par l’utilisation de services. Dans Adnotatio, les services sont :
* annotateurs
* auth
* uploads
* projets
* administrateur

![Alt text](https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Farchi111%402x-100.jpg?alt=media&token=c0623ae4-fc0e-460b-ae6f-011d33afef4d)

### 4.3. Stockage des données
Ce projet a été réalisé avec la librairie angularfire2 V5 (AngularFirestore), ce qui permet l’utilisation de collections offertes par Cloud Firestore. Les données sont donc entreposées dans des documents organisés en collections. Chaque document contient un ensemble de paires clé-valeur.  

```
├── administrateurs
│   ├── id : "administrateur@uqo.ca"
│   ├── data :
│   │	├── nom : "Smith"
│   │	└── prenom : "John"
├── annotateurs
│   ├── id : "administrateur@uqo.ca&annotateur@uqo.ca"
│   └── data :
│       ├── administrateur : "administrateur@uqo.ca"
│       ├── courriel : "annotateur@uqo.ca"
│       ├── nom : "Johnson"
│       ├── prenom : "George"
│       └── projet : [{projet1},{projet2},{projet3},...]
└── uploads
    ├── id : "nom_du_rapport.xml"
    └── data :
        ├── administrateur : "administrateur@uqo.ca"
        ├── createdAt : "YYYY-MM-DD"
        ├── projet : "projet_X"
        ├── size : "xxx k"
        └── url : "https://firebases"
```

<a id="docs"></a>
## 5. Documentation, rapport de bugs & accès à l'application
- Consultez la [documentation complète du logiciel](https://github.com/iglewski/Annotator2/wiki) sur le wiki   
- Rapportez une erreur ou un commentaire sur le [compte SonarQube du projet](#)  
- Accédez à [Adnotatio](https://infsys-2a1e8.firebaseapp.com/login?session_id=123456789#anchor) en ligne 

<a id="createurs"></a>
## 6. Créateurs
Équipe Annotator 2 :  
- [Simon Boisvert](https://github.com/SimonUQO)
- [Léina Choute](https://github.com/choutel)
- [Mélise Deslauriers](https://github.com/PetitCartonVert)
- [Mohamed Nassim Hamour](https://github.com/NassimHamour)
- [Mamadou Belly Ngaido](https://github.com/Mamadou03)
- [Kossi Ahlin Cornelus Madjri](https://github.com/cornelusma)
- [Pascal Néron](https://github.com/neronp01)
