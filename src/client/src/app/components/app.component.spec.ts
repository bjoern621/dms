import '../../../matchMedia'
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, HeaderComponent, SidenavComponent],
    imports: [RouterTestingModule, MatSnackBarModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dms');
  });
});
