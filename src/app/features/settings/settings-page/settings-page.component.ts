import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent implements AfterViewInit {
  stepper!: Stepper;
  step: number = 1;

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {}

  ngAfterViewInit() {
    const stepperElement = document.querySelector('#stepper3');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
      this.cdRef.detectChanges();
    } else {
      console.error('Stepper element not found!');
    }
  }

  setStep(step: number) {
    this.step = step;
  }
}
