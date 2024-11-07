import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';

  constructor() {
    this.loadTheme();
  }

  getTheme(){
    return this.theme;
  }
  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private loadTheme(): void {
    if (!localStorage.getItem('theme')) {
      this.theme = this.getSystemTheme();
    } else {
      this.theme =
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-bs-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  private getSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      return 'dark';

    return 'light';
  }
}
