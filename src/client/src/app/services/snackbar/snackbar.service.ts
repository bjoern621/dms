import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackbarComponent } from 'src/app/components/icon-snackbar/icon-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _displayDuration = 3000;

  constructor(private _snackBar: MatSnackBar) { }

  public showSuccess(message: string) {
    this._snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'done', 'green-snackbar'));
  }

  public showError(message: string) {
    this._snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'error', 'red-snackbar'));
  }

  public showWarning(message: string) {
    this._snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'warning', 'yellow-snackbar'));
  }

  public showInfo(message: string) {
    this._snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'info', 'blue-snackbar'));
  }

  private getIconConfig(message: string, icon: string, cssClass: string): any {
    return {
      announcementMessage: message,
      duration: this._displayDuration,
      data: {
        _snackBar: this._snackBar,
        message: message,
        icon: icon
      },
      panelClass: cssClass,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    }
  }
}
