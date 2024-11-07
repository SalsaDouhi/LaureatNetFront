import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockService } from '../../../core/services/blockData.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['../../../shared/confirmation-dialog/confirmation-dialog.component.css'],
})
export class PasswordModalComponent {
  @Input() message: string | undefined;
  errorMessage: string | undefined;
  @Input() userId: number | undefined; // Define @Input for userId
  @Input() blockId: number | undefined; // Define @Input for blockId
  inputForm: FormGroup;
  validatedValue: string = '';

  constructor(    
    private blockService: BlockService,
    private fb: FormBuilder, 
    private activeModal?: NgbActiveModal,
  ) {
    this.inputForm = this.fb.group({
      userInput: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inputForm.valid) {
      this.validatedValue = this.inputForm.value.userInput;
      // Use userId and blockId as needed (e.g., send to blockService)
      console.log('Mot de passe entré:', this.validatedValue);
      console.log('userId:', this.userId);
      console.log('blockId:', this.blockId);
      this.blockService.checkPassword(this.userId, this.validatedValue)
        .subscribe((isPasswordCorrect: boolean) => {
          console.log('isPasswordCorrect', isPasswordCorrect);
          if (isPasswordCorrect) {
            this.activeModal?.close(true); 
          } else {
            this.errorMessage = 'Hmm, ce n\'est pas le bon mot de passe. Veuillez réessayer.';
          }
        });
  
      //this.activeModal?.close(this.validatedValue); // Close modal after successful submission (optional)
    } else {
      this.errorMessage = 'Veuillez entrer votre mot de passe.'; // Set error message when form is invalid
    }
  }
  
  close() {
    this.activeModal?.close();
  }
}