import {Component, OnInit} from '@angular/core';
import {AlertMessageService} from '../../services/alert-message.service';


@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  public onSuccessDelete;
  public showMessage;
  public isDelete: boolean;
  public isAdded: boolean;
  public isEdited: boolean;
  public isServerError: boolean;

  constructor(
    public alertMessageService: AlertMessageService
  ) {
  }

  ngOnInit() {
    // Massage to add album
    this.alertMessageService.alertAddEventObservableSubject.subscribe((data) => {
      this.onSuccessDelete = data;
      if (this.onSuccessDelete.action === 'add') {
        this.isAdded = true;
        this.showMessage = `To add album - ${this.onSuccessDelete.id} was successful : ${this.onSuccessDelete.title}`;
        setTimeout(() => {
          this.showMessage = '';
          this.isAdded = false;
        }, 4000);
      }
// Massage to delete album
      if (this.onSuccessDelete.action === 'delete') {
        this.isDelete = true;
        this.showMessage = `To delete album - ${this.onSuccessDelete.id} was successful : ${this.onSuccessDelete.title}`;
        setTimeout(() => {
          this.showMessage = '';
          this.isDelete = false;
        }, 4000);
      }
// Massage to edit album
      if (this.onSuccessDelete.action === 'edit') {
        this.isEdited = true;
        this.showMessage = `To edit album - ${this.onSuccessDelete.id} was successful : ${this.onSuccessDelete.title}`;
        setTimeout(() => {
          this.showMessage = '';
          this.isEdited = false;
        }, 4000);
      }
// Massage to error
      if (this.onSuccessDelete.action === 'ServerError') {
        this.isServerError = true;
        this.showMessage = `There are some problems ,please turn back`;
        setTimeout(() => {
          this.showMessage = '';
          this.isServerError = false;
        }, 3500);
      }
    });
  }
}
