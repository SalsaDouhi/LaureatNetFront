import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { sectionItemDTO } from '../../../shared/interfaces/SectionItem';
import { SectionsService } from '../../../core/services/sections.service';
import { Section } from '../../../shared/interfaces/Section';

@Component({
  selector: 'app-section-modal-form',
  templateUrl: './section-modal-form.component.html',
  styleUrl: './section-modal-form.component.css',
})
export class SectionModalFormComponent {
  @Input() initialSectionItem: sectionItemDTO = {} as sectionItemDTO;
  sectionItem: sectionItemDTO = {} as sectionItemDTO;
  form!: FormGroup;
  actionsLock: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sectionsService: SectionsService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
    });

    // populating fields
    if (this.initialSectionItem.id) {
      this.form.setValue({
        title: this.initialSectionItem.title,
        startDate: this.initialSectionItem.startDate,
        endDate: this.initialSectionItem.endDate || null,
      });
    }
  }

  showSaveButton() {
    if (this.initialSectionItem.id) {
      let endDate =
        this.form.get('endDate')?.value == ''
          ? null
          : this.form.get('endDate')?.value;
      if (
        this.initialSectionItem.title != this.form.get('title')?.value ||
        this.initialSectionItem.startDate !=
          this.form.get('startDate')?.value ||
        this.initialSectionItem.endDate != endDate
      ) {
        if (
          this.form.get('title')?.value.toString().trim() != '' &&
          this.form.get('startDate')?.value
        ) {
          return true; // something changed & required field inserted
        }
        return false; // something changed but required fields missing
      }
      return false; // nothing changed
    } else {
      if (
        this.form.get('title')?.value.toString().trim() != '' &&
        this.form.get('startDate')?.value
      ) {
        return true; // required field inserted
      }
      return false; // required fields not inserted
    }
  }

  onSave() {
    this.actionsLock = true;
    if (!this.form.valid) return;

    let newSectionItem = {
      id: this.initialSectionItem.id,
      sectionTypeId: this.initialSectionItem.sectionTypeId,
      userAccountId: this.initialSectionItem.userAccountId,
      title: this.form.get('title')?.value,
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value || null,
    } as sectionItemDTO;

    if (this.initialSectionItem.id) {
      // * update
      console.log(newSectionItem);
      this.sectionsService.updateSectionItem(newSectionItem).subscribe({
        next: (s) => {
          // console.log(`section item updated: `, s);
          this.initialSectionItem = s;
        },
        error: (error) => {
          console.log(`error updating section item: `, error);
        },
      });
    } else {
      // * create
      this.sectionsService.createSectionItem(newSectionItem).subscribe({
        next: (s) => {
          // console.log(`section item created: `, s);
          this.initialSectionItem = s;
        },
        error: (error) => {
          console.log(`error creating new section item: `, error);
        },
      });
    }

    this.actionsLock = false;
  }

  onDelete() {
    this.actionsLock = true;
    this.sectionsService
      .deleteSectionItem(this.initialSectionItem.id)
      .subscribe({
        next: () => {
          // console.log(`section item deleted: `);
        },
        error: (error) => {
          console.log(`error deleting section item: `, error);
        },
      });
    this.actionsLock = false;
  }
}
