import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { AnnotateurService, IAnnotateur } from '../shared/annotateur.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        transform: 'translateX(0)',
      })),
      state('active', style({
        transform: 'translateX(1000)',
      })),
      transition('inactive => active',  animate('6000s')),
      transition('active => inactive', animate('6000s'))
    ])
  ]
})



export class HomeComponent implements OnInit {
  state= 'inactive';
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  editeurObj: Observable<any>;
  editeurObjRef: AngularFireObject<any>;
  editeurList: Observable<any>;
  estUnAnnotateur = false;
  estUnAdministrateurSys = false;
  estUnAdministrateur = false;
  courriel: string;


  constructor(private auth: AuthService, db: AngularFireDatabase, private an: AnnotateurService) {
    this.itemRef = db.object('/administration');
    this.editeurObjRef = db.object('/edition');
    this.editeurList = db.list('/edition').valueChanges();
    this.item = this.itemRef.valueChanges();
    this.editeurObj = this.editeurObjRef.valueChanges();
    auth.user.subscribe(
      (x) => this.user = this.auth.currentUserDisplayName,
      (err) => console.log('err'),
      () => console.log('fini')
    )
  }
  ngOnInit() {
this.infoUser();


  }
logOut() {

    this.auth.logout();
}
  infoUser(){
    console.log('x', this.auth);
    this.auth.user.subscribe( x => {

      this.infoRole( x.email );
      this.courriel = x.email;
    })
  }
  infoRole( email: string ) {
    console.log('email', email);
    this.an.trouverAnnotateur(email).snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IAnnotateur;
          const id = a.payload.doc.id;

          console.log('id', data['data']);

          // console.log('test', id , data, data.id )
          return { id, ...data };
        });
      }).subscribe(
        x => {
          x.forEach( y => {
            console.log('y' ,y);
            if ( y['id'] === 'annotateur' ) {
              this.estUnAnnotateur = true;
            } if ( y['id'] === 'administrateurSys' ) {
              this.estUnAdministrateurSys = true;
            } if ( y['id'] === 'administrateur' ) {
              this.estUnAdministrateur = true;
            }
          })
        }
    );
  }
}
