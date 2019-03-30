import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from '../../services/album-events.service';
import { Album } from '../../interfaces/Album';
import { NgForm } from '@angular/forms';
import { AlertMessageService } from '../../services/alert-message.service';
import { EditAlbumService } from '../../services/edit-album.service';

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: ''
  };
  isEdited = false;
  formInput: Album;
  isEditedClicked: boolean;
  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessageService: AlertMessageService,
    public editAlbumService: EditAlbumService
  ) { }

  ngOnInit() {
    this.editAlbumService.albumEditEventObservableSubject.subscribe((data: Album) => {
    if (Object.keys(data).length !== 0) {
      this.isEdited = true;
      this.formInput = data;
    } else {
      this.isEdited = false;
    }
  });
  }
// Method to send form
  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
      const addAlbumAlert: any = data;
      addAlbumAlert.action = 'add';
      this.alertMessageService.emitAddNewAlertMessage(addAlbumAlert);
      this.form.resetForm();
    });
  }
// Method to edit form
  onEditFormSubmit(form) {
    this.albumService.editAlbum(this.formInput).subscribe((data: Album) => {
    this.editAlbumService.emitChangeOnEditForms(data);
    this.isEdited = false;
    const addAlbumAlert: any = data;
    addAlbumAlert.action = 'edit';
    this.alertMessageService.emitAddNewAlertMessage(addAlbumAlert);
    form.reset();
  }, (err) => {
    console.log(err);
    const addAlbumAlert: any = this.formInput;
    this.alertMessageService.emitAddNewAlertMessage(addAlbumAlert);
  });
}
}

