import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

export interface Item { id: string; data: Upload; }

export interface IUpload {
  $key ?: string;
  administrateur ?: string;
  file ?: File;
  name ?: string;
  url ?: string;
  size ?: number;
  progress ?: number;
  createdAt ?: Date;
  projet ?: string;
  Annotaeur ?: Array<string>
  }

@Injectable()
export class UploadService {
  private uploadsCollection: AngularFirestoreCollection<Upload>;
  uploads: Observable<Upload[]>;
  upload: IUpload;
  constructor(private db: AngularFireDatabase, private readonly afs: AngularFirestore) {
    this.uploadsCollection = afs.collection<Upload>('uploads');
    this.uploads = this.uploadsCollection.valueChanges();
  }
  pushUpload(upload: Upload, courriel: string, projet: string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
      console.log(snapshot)
        // upload in progress
        // upload.progress = (snapshot['UploadTaskSnapshot'].bytesTransferred / snapshot['UploadTaskSnapshot'].totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        const newDate = new Date(uploadTask.snapshot.metadata.timeCreated);
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.createdAt = newDate;
        console.log('ici', upload);
        this.saveFileData(upload, courriel, projet)
      }
    );
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, courriel: string, projet: string) {

    this.db.list(`uploads`).push(upload);
    const id = upload.name;
    const data =  this.test(upload, courriel, projet );
    console.log('data', data);
    const item: Item = { id, data };
    this.uploadsCollection.add( item );
  }
  test(upload: Upload, courriel: string, projet: string): IUpload {
    const temp: IUpload = {};
    temp.name = upload.name;
    temp.url = upload.url;
    temp.createdAt = upload.createdAt;
    temp.size = upload['file'].size;
    temp.administrateur = courriel;
    temp.projet = projet;
    console.log('test', temp);
    return temp;
  }
  get infoUpload(): Observable<Upload[]> {
    let uploadTab: Observable<Upload[]>
    return uploadTab = this.uploads;
  }
}
