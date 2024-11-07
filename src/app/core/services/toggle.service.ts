import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  isToggeled: boolean = false;
  isHovered: boolean = false;

  constructor() {}

  toggleSidebar() {
    if (this.isToggeled) {
      document.body.classList.remove('toggled');
      this.isToggeled = false;
    } else {
      document.body.classList.add('toggled');
      this.isToggeled = true;
    }
  }

  hoverSidebar(isHovering: boolean) {
    if (isHovering) {
      document.body.classList.add('sidebar-hovered');
      isHovering = true;
    } else {
      document.body.classList.remove('sidebar-hovered');
      isHovering = false;
    }
  }
}
