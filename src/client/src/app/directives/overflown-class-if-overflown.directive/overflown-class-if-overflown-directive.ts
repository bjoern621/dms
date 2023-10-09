import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOverflownClassIfOverflown]'
})
export class OverflownClassIfOverflownDirective {

  constructor(private el: ElementRef) { }

  @HostListener('window:resize') onResize() {
    this.checkIfOverflown();
  }

  ngAfterViewInit() {
    this.checkIfOverflown();
  }

  private checkIfOverflown() {
    const element: Element = this.el.nativeElement;

    // Check if the element is overflown vertically
    const isOverflown = element.scrollHeight > element.clientHeight;

    if (isOverflown)
      element.classList.add('overflown');
    else
      element.classList.remove('overflown');
  }
}
