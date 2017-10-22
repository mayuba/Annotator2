# Adnotatio
![Alt text](https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Fadno.svg?alt=media&token=2992a291-6958-4155-9282-6d37084d3b76)

## AngularFirestore 
Ce projet a été réalisé avec la librairie angularfire2 V5, ce qui permet l’utilisation de collections offert par « Cloud Firestore ». Les données sont entreposées dans des documents organisés en collections. Chaque document contient un ensemble de paires clé-valeur.
* **administrateurs**
  *   id : administrateur@uqo.ca
  * data :
    * nom :
    * prenom :  
* **annotateurs** 
  * id : administrateur@uqo.ca&annotateur@uqo.ca
  * data : 
    * administrateur: administrateur@uqo.ca
    * courriel: annotateur@uqo.ca
    * nom : 
    * prenom :
    * projet : [ {projet1},{projet2},{projet3},...]   
* **uploads**
  * id : nom_du_rapport.xml
  * data : 
    * administrateur : administrateur@uqo.ca
    * createdAt : date
    * projet: projet_X
    * size : xxx k
    * url : https://firebases


## Build 
Exécutez `ng build` pour générer le projet. Les fichiers utilisé en production seront enregistrés dans le répertoire `dist /`. Les paramètres du build se trouvent dans le fichier firebase.json.

## Exécutez les tests unitaires
Exécutez `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io/1.0/index.html).

