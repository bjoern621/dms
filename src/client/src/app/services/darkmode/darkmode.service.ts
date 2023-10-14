import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  constructor() {
    const prefersDarkmode = window.matchMedia('(prefers-color-scheme: dark)');

    this.setDarkmode(prefersDarkmode.matches)

    // Listen for changes to the prefers-color-scheme media query
    prefersDarkmode.addEventListener('change', (mediaQuery) => this.setDarkmode(mediaQuery.matches));
  }

  public setDarkmode(set: boolean | undefined) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('darkmode', set);
  }
}
