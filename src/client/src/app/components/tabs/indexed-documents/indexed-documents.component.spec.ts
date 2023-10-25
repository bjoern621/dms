import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedDocumentsComponent } from './indexed-documents.component';

describe('IndexedDocumentsComponent', () => {
  let component: IndexedDocumentsComponent;
  let fixture: ComponentFixture<IndexedDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexedDocumentsComponent]
    });
    fixture = TestBed.createComponent(IndexedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
