import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interfaces/Album';
import { AlbumsService } from '../../services/albums.service';
import { AlertMessageService } from '../../services/alert-message.service';
import { EditAlbumService } from '../../services/edit-album.service';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  isEdited = false;

  @Input() item: Album;
  @Output() outputDeleteAlbum = new EventEmitter();

  constructor(
    private albumService: AlbumsService,
    public alertMessageService: AlertMessageService,
    public editAlbumService: EditAlbumService
  ) {
  }

  ngOnInit() {
    this.editAlbumService.albumEditEventObservableSubject.subscribe((data: Album) => {
      if (Object.keys(data).length !== 0) {
        this.isEdited = false;
      }
    });
  }
// Method to delete item
  onDeleteItem() {
    const albumItem = this.item;
    this.albumService.deleteAlbum(albumItem).subscribe((data: Album) => {
      this.outputDeleteAlbum.emit(albumItem);
      const deleteAlbumAlert: any = albumItem;
      deleteAlbumAlert.action = 'delete';
      this.alertMessageService.emitAddNewAlertMessage(deleteAlbumAlert);
    }, (err) => {
      console.log(err);
    });
  }
  // Method to edit item
  onEditItem() {
    this.editAlbumService.emitChangeOnEditForms(this.item);
    this.isEdited = true;
  }
// Method to cancel item
  onCancelItem() {
    this.isEdited = false;
    this.editAlbumService.emitChangeOnEditForms({});
  }
}
