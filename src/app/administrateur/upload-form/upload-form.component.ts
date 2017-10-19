import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../shared/upload.service';
import { Upload } from '../../shared/upload';
import * as _ from 'lodash';
import { AnnotateurService, IAnnotateur } from '../../shared/annotateur.service';


@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
  providers: [UploadService]
})
export class UploadFormComponent {
  @ Input() courriel: string;
  @ Input() listeNomProjetRepertoire: string;
  @ Input() _listeAnnotateur: Array<IAnnotateur>;
  @ Output() etat = new EventEmitter <string>();
  currentUpload: Upload;
  dropzoneActive: boolean = false;
  constructor(private upSvc: UploadService, private an: AnnotateurService) { }
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }
  handleDrop(fileList: FileList) {
    let filesIndex = _.range(fileList.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      this.upSvc.pushUpload(this.currentUpload, this.courriel, this.listeNomProjetRepertoire)}
    )
    this.updateAnnotaieur();
  }
  updateAnnotaieur() {
    this._listeAnnotateur.forEach( x => {
      let doitEtreUbdated = true;
      x.projets.forEach( y => {
        if ( y === this.listeNomProjetRepertoire) {
          doitEtreUbdated = false;
          console.log('projet', y);
        }
      })
      if (doitEtreUbdated === true){
      let temp = [];
      temp = x.projets;
      temp.push(this.listeNomProjetRepertoire);
        console.log(' annotateur', x)
    // this.an.updateAnnotateur(x);
      }
    })
    this.etat.emit('home');
  }

}
