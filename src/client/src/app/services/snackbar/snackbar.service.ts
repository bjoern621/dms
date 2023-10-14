import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackbarComponent } from 'src/app/components/shared/icon-snackbar/icon-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private displayDuration = 3000;

  constructor(private snackBar: MatSnackBar) { }

  public showSuccess(message: string) {
    this.snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'done', 'green-snackbar'));
  }

  public showError(message: string) {
    this.snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'error', 'red-snackbar'));
  }

  public showWarning(message: string) {
    this.snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'warning', 'yellow-snackbar'));
  }

  public showInfo(message: string) {
    this.snackBar.openFromComponent(
      IconSnackbarComponent,
      this.getIconConfig(message, 'info', 'blue-snackbar'));
  }

  private getIconConfig(message: string, icon: string, cssClass: string): any {
    return {
      announcementMessage: message,
      duration: this.displayDuration,
      data: {
        snackBar: this.snackBar,
        message: message,
        icon: icon
      },
      panelClass: cssClass,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    }
  }
}
