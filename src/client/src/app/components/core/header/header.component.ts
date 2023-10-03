import { Component } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _snackbarService: SnackbarService) { }

  openSnackBar() {
    this._snackbarService.showError('Success!');
  }
}
