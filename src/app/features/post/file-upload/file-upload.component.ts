import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  files: File[] = [];
  fileURLs: string[] = [];
  @Input() multiple : boolean = true;
  @Input() accept : string = "image/*,.pdf";
  addFiles(newFiles: File[]) {
    this.files.push(...newFiles);
    newFiles.forEach(file => {
      this.fileURLs.push(URL.createObjectURL(file));
    });
  }

  getFiles(): File[] {
    return this.files;
  }

  getFileURLs(): string[] {
    return this.fileURLs;
  }

  clearFiles() {
    this.files = [];
    this.fileURLs.forEach(url => URL.revokeObjectURL(url));
    this.fileURLs = [];
  }

  drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      const files: File[] = Array.from(event.dataTransfer.files);
      this.addFiles(files);
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles: File[] = [];
      for (let i = 0; i < input.files.length; i++) {
        const fileCopy = new File([input.files[i]], input.files[i].name, { type: input.files[i].type });
        newFiles.push(fileCopy);
      }
      this.addFiles(newFiles);
      console.log('Selected files:', this.files);
      // Reset the file input value to allow re-selection of the same file
      input.value = '';
    }
  }
  upload(event:any) {
    event.preventDefault();
    if(!this.multiple&&this.files&&this.files.length>0){
      console.log("Already uploaded a file");
      return;
    }
    const fileInput = document.querySelector('#image-upload') as HTMLElement;
    fileInput.click();
  }
}