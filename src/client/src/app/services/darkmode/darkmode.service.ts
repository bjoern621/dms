import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  constructor() {
    const prefersDarkmode = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDarkmode.addEventListener('change', (mediaQuery) => this.setOrToggleDarkmode(mediaQuery.matches));
  }

  public setOrToggleDarkmode(set: boolean | undefined) {
    document.body.classList.toggle('darkmode', set);
  }
}
