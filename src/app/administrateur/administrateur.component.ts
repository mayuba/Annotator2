import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnnotateurService, IAnnotateur } from '../shared/annotateur.service';
import { ProjetService, IProjet } from '../shared/projet.service';
import { FormGroup,  FormBuilder,  Validators} from '@angular/forms';


import { UploadService } from './../shared/upload.service';
import {Upload} from "../shared/upload";

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css'],
  providers: [UploadService]
})
export class AdministrateurComponent implements OnInit {
  @ Input() editeurList: Observable<Array<any>>;
  @ Input() courriel: string;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  annotateurs: BehaviorSubject<IAnnotateur[]>;
  projets: BehaviorSubject<IProjet[]>;
  files: BehaviorSubject<Upload[]>;
  public foods;
  annotateurForm: FormGroup;
  listeNomProjet: Array<string>;
  _listeAnnotateur: Array<IAnnotateur>;
  listeNomProjetRepertoire: string;
  vue: string;
  ischecked= false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  test4 = 'allo';


  constructor(private fb: FormBuilder, db: AngularFireDatabase, private http: Http, private up: UploadService,  private an: AnnotateurService, private pr: ProjetService) {
    this.itemRef = db.object('/edition');
    this.item = this.itemRef.valueChanges();
    this.test4 = 'allo';
  }

  save(newName: string) {
   // this.editeurList.push({email: newName});
  }

  deleteItem(key: string) {
    console.log(key);
  }

  ngOnInit() {
    this.vue = 'home';
    // addAnnotateur
    // addText
    this.createForm();
    this.trouverListeAnnotateur(this.courriel);
    this.trouverListeProjet(this.courriel);
    this.creationListeUpload();
    this.listeNomProjet = [];
    this._listeAnnotateur = [];

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  test(e) {
  //  var jsonText = JSON.stringify(this.xmlToJson(e));
  }
  trouverListeAnnotateur(courriel: string) {
    this.an.trouverListeAnnotateur(courriel).subscribe( x => {
      this.annotateurs = new BehaviorSubject(x);
      this.annotateurs.subscribe( y => {
        console.log('liste ann',y);
        }
      )
      }
    )
  }
  trouverListeProjet(courriel: string) {
    this.pr.trouverListeProjet(courriel).subscribe( x => {
        this.projets = new BehaviorSubject(x);
        console.log('projet', x)
        this.projets.subscribe( y => {
          console.log(y);
          }
        )
      }
    )
  }

  creationListeUpload() {
    this.up.infoUpload.subscribe(
      x => {
        this.files = new BehaviorSubject(x);
        console.log('upliste', x )
      }
    )
  }
  createForm() {
    this.annotateurForm = this.fb.group({
      courrielForm: ['', Validators.email],
      prenomForm: ['', Validators.required ],
      nomForm: ['', Validators.required ]
    });
  }
  get isDisabled(): boolean {
    let status: boolean;
    if (this.annotateurForm.status === 'VALID') {
      status = false;
    } else {
      status = true;
    }
    return status;
  }


  selectionProjets(selected: any , nomProjet: string) {
    if (selected.selected === true) {
      this.listeNomProjet.push(nomProjet)
    } else {
      this.listeNomProjet.map( x => {
        if ( nomProjet === x )
          this.listeNomProjet.pop();
        }
      )
    }
  }
  selectionProjetsRepertoire(selected: any , nomProjet: string) {
    if (selected.selected === true) {
      this.listeNomProjetRepertoire = nomProjet;
    } else {
      this.listeNomProjetRepertoire = '';
    }
    console.log('test',  this.listeNomProjetRepertoire)
  }

  selectionAnnotateurProjet(selected: any , annotateur: IAnnotateur) {
    if (selected.selected === true) {
      this._listeAnnotateur.push(annotateur)
    } else {
      this._listeAnnotateur.map( x => {
          if ( annotateur === x )
            this._listeAnnotateur.pop();
        }
      )
    }
    console.log(this._listeAnnotateur, 'annotateur')
  }
  addAnnotateurClick() {
    this.vue = 'addAnnotateur';
  }
 addTextesClick(){
   this.vue = 'addText'
 }
  enregistrerAnnotateurClick(nom: string, prenom: string, courriel: string ) {
    let annotateur: IAnnotateur;
    const id = this.courriel + '&' + courriel;
    annotateur = {id: id, nom: nom, prenom: prenom, courriel: courriel, projets: this.listeNomProjet, administrateur: this.courriel}
    this.an.addAnnotateur(id, annotateur);
    this.vue = 'home';
    this.createForm();
  }
  UpdateChangeEtat(e){
   this.vue = e;
   console.log(e)
  }
}
