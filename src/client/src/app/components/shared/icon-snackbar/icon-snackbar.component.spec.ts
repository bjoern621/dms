import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSnackbarComponent } from './icon-snackbar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('IconSnackbarComponent', () => {
  let component: IconSnackbarComponent;
  let fixture: ComponentFixture<IconSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconSnackbarComponent],
      imports: [MatIconModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(IconSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
