import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Section } from '../../../shared/interfaces/Section';
import { SectionModalFormComponent } from '../section-modal-form/section-modal-form.component';
import { sectionItemDTO } from '../../../shared/interfaces/SectionItem';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-section-modal',
  templateUrl: './section-modal.component.html',
  styleUrl: './section-modal.component.css',
})
export class SectionModalComponent implements OnInit{
  @Input() sections!: Section[];
  @ViewChildren('containerRef', { read: ViewContainerRef })
  containerRefs?: QueryList<ViewContainerRef>;
  containersRef!: QueryList<ViewContainerRef>;

  constructor(
    public dialogRef: MatDialogRef<SectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    if (this.data == null) return;
    this.sections = this.data.sections;
  }

  insertComponent(index: number, sectionType: number) {
    const containerRef = this.containerRefs?.toArray()[index];
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        SectionModalFormComponent
      );
    const componentRef = containerRef?.createComponent(componentFactory);

    // to pass the type
    let sectionItem = {
      sectionTypeId: sectionType,
      userAccountId: parseInt(this.profileService.getCurrentUserId()?.toString()!, 10),
    } as sectionItemDTO;

    if (componentRef) componentRef.instance.initialSectionItem = sectionItem;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
