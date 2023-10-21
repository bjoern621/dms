import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListComponent } from './document-list.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentListComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule, MatMenuModule]
    });
    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
