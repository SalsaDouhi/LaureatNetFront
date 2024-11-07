import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordModalComponent } from '../../features/block/password-modal/password-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private modalService: NgbModal) { }

    openPasswordModal(message: string, userId: number, blockId: number): Promise<{ isPasswordCorrect: boolean }> {
        const modalRef = this.modalService.open(PasswordModalComponent);
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.blockId = blockId; 

        return modalRef.result.then(
            (result) => {                
                if (result) {
                    return { isPasswordCorrect: true };
                } else {
                    return { isPasswordCorrect: false };
                }
            }
        );
    }
}
