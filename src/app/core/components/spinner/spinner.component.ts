import { Component } from '@angular/core';
import { HttpHoldService } from '../../services/http-hold.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public httpHoldService :HttpHoldService ){}

}
