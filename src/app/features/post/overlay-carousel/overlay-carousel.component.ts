import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-overlay-carousel',
  templateUrl: './overlay-carousel.component.html',
  styleUrl: './overlay-carousel.component.css'
})
export class OverlayCarouselComponent {
  @Output() toggleCarouselEvent = new EventEmitter<boolean>();
  @Input() attachments:string[]=[];
  toggle() {
    console.log("toggled")
    this.toggleCarouselEvent.emit(true);
  }

  clicked(event: Event) {
    event.stopPropagation(); // Prevents the click event from propagating to the overlay
  }
}
