import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from 'src/app/services/darkmode/darkmode.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _snackbarService: SnackbarService, private darkmode: DarkmodeService) { }

  openSnackBar() {
    this._snackbarService.showError('Success!');
  }

  public setDarkmode() {
    this.darkmode.setDarkmode(undefined);
  }
}
