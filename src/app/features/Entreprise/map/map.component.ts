import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-map-location',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class mapLocation implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() initialLatitude: number = 0; // Default to 0 if not provided
  @Input() initialLongitude: number = 0; // Default to 0 if not provided
  @Input() lock: boolean = false;
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral | undefined;
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  marker: google.maps.Marker | undefined;
  @Output() locationSelected: EventEmitter<{ x: number; y: number }> =
    new EventEmitter();

  constructor() {
    // Check if Google Maps API is loaded successfully
    this.apiLoaded = of(true);
  }

  ngOnInit() {
    // Nothing to do here since we will initialize the map in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.loadGoogleMapsApi().then(() => {
      setTimeout(() => {
        this.initializeMap();
       }, 500); 
    });
  }

  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVVR3l2-jrZBfdZALZ-XO6gRYDN-3Jnsw&libraries=places';
        script.onload = () => {
          resolve();
        };
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  initializeMap() {
    // Check if initial coordinates are set to default (0, 0)
    if (this.initialLatitude === 0 && this.initialLongitude === 0) {
      this.setCurrentPosition();
    } else {
      this.setMapCenter(this.initialLatitude, this.initialLongitude);
    }
  }

  setCurrentPosition() {
    // Get the current position and set it as the initial center
    if (!this.initialLatitude && !this.initialLongitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setMapCenter(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current position:', error);
          // Fallback to a default location if permission denied or error occurs
          this.setMapCenter(48.8566, 2.3522); // Default to Paris, France
        }
      );
    } else {
      this.setMapCenter(this.initialLatitude, this.initialLongitude);
    }
  }

  setMapCenter(latitude: number, longitude: number) {
    this.center = {
      lat: latitude,
      lng: longitude,
    };
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom,
      mapId: 'DEMO_MAP_ID',
    };
    const map = new google.maps.Map(this.mapContainer?.nativeElement, mapOptions);
    this.addMarker(latitude, longitude, map);
    // Add click event listener to the map
    map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.onMapClick(event, map);
    });
  }

  onMapClick(event: google.maps.MapMouseEvent, map: google.maps.Map) {
    // Check if event and event.latLng are not null
    if (event && event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Log or use the latitude and longitude as needed
      console.log('Clicked coordinates:', lat, lng);
      if (!this.lock) {
        // Add a marker at the clicked position
        this.addMarker(lat, lng, map);
      }
    }
  }

  addMarker(lat: number, lng: number, map: google.maps.Map) {
    // Remove existing marker if present
    if (this.marker) {
      this.marker.setMap(null);
    }

    // Add new marker
    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      ...this.markerOptions,
    });
    this.locationSelected.emit({ x: lat, y: lng });
  }
}
