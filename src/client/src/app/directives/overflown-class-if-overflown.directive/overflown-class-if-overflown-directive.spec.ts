import { TestBed } from '@angular/core/testing';
import { OverflownClassIfOverflownDirective } from './overflown-class-if-overflown-directive';
import { ElementRef, Injectable } from '@angular/core';

@Injectable()
class MockElementRef {
  nativeElement!: {};
}

describe('ExtraPaddingRightIfOverflownDirective', () => {
  let elRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new MockElementRef() }]
    });

    elRef = TestBed.inject(ElementRef);
  });

  it('should create an instance', () => {
    const directive = new OverflownClassIfOverflownDirective(elRef);
    expect(directive).toBeTruthy();
  });
});
