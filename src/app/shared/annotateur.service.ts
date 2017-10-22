import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface IAnnotateur {
  id: string,
  administrateur ?: string;
  nom ?: string,
  prenom ?: string,
  courriel ?: string,
  projets ?: Array<string>,
  textAnnotes ?: Array<string>,
  photo ?: string
}

export interface Item { id: string; data: IAnnotateur; }
@Injectable()
export class AnnotateurService {
annotateurCollection: AngularFirestoreCollection<IAnnotateur>
  annotateurDoc:  AngularFirestoreDocument<IAnnotateur>;
  annotatateurList: Observable<IAnnotateur[]>
  itemCollection: AngularFirestoreCollection<Item>
  itemsList: Observable<Item[]>
  annotateur = [];


  constructor(private dbc: AngularFirestore) { }
  trouverAnnotateur(courriel: string): AngularFirestoreCollection<IAnnotateur> {
    let tabAnnotateur: AngularFirestoreCollection<IAnnotateur>;
    this.annotateurCollection = this.dbc.collection('roles', ref => {
      return ref.where('email', '==', courriel)
    });
    tabAnnotateur = this.annotateurCollection;
    return tabAnnotateur;
  }

  trouverListeAnnotateur(courriel: string): Observable<IAnnotateur[]>{
    let tabAnnotateur: Observable<IAnnotateur[]>;
    this.annotateurCollection = this.dbc.collection('annotateurs', ref => {
      return ref.where('data.administrateur', '==', courriel)
    });
    this.annotatateurList =  this.annotateurCollection.valueChanges();
    tabAnnotateur = this.annotatateurList;
    return tabAnnotateur = this.annotatateurList;
}

removeAnnotateurs(courriel: string) {
  this.itemCollection = this.dbc.collection<Item>('annotateurs', ref => {
    return ref.where('data.administrateur', '==', 'administrateur@uqo.ca')
  });
  this.itemsList = this.itemCollection.valueChanges()
  ;
}
_trouverAnnotateur(courriel: string) {
  this.trouverListeAnnotateur(courriel).subscribe( x => {
    this.annotateur.push(x);
    }
  )
}
  addAnnotateur( id: string, data: IAnnotateur): boolean {
    const item: Item = { id, data };
    this.annotateurCollection = this.dbc.collection('annotateurs/');
    this.annotateurCollection.add(item);
    return false;
  }

  updateAnnotateurOb(annotateur: IAnnotateur, projets: Array<string>): IAnnotateur {
    const temp = { id: annotateur.id, nom : annotateur.nom, prenom: annotateur.prenom,
      courriel: annotateur.courriel, projets: projets, textAnnotes: annotateur.textAnnotes,
      administrateur: annotateur.administrateur,  photo: annotateur.photo}
    return temp;
  }
  updateAnnotateur( dataAnnotaeur: IAnnotateur) {
    const id = dataAnnotaeur.id;
    const data = dataAnnotaeur;
    const item: Item = { id, data };
    this.annotateurDoc = this.dbc.doc<IAnnotateur>('annotateurs/');
   // this.annotateurDoc.update(item)
  }
  get test1(): boolean {
    return true;
  }
}


