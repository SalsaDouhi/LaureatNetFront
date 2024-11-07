import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PostDataService } from '../../../core/services/postData.service';
import { PostCreationVM } from '../../../shared/interfaces/PostCreationVM';
import { AuthService } from '../../../core/services/auth.service';
import { PostContentInputComponent } from '../post-content-input/post-content-input.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.css'
})
export class PostCreationComponent {
	@ViewChild(PostContentInputComponent) postContentInput!: PostContentInputComponent;
	@ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent; // ViewChild to access the FileUploadComponent
	username?:string = "Me Hyper";
	constructor(private postDataService: PostDataService, private authService: AuthService, protected profileService: ProfileService){}
	@Output() closeEvent :EventEmitter<void> = new EventEmitter();
	@Output() sumbitEvent :EventEmitter<void> = new EventEmitter();

	createPost() {
		if (!this.postContentInput.inputContent) {
			console.error("Post content is empty");
			return;
		}
		const posterId = this.authService.getCurrentUserId();
		if(posterId===null){
			console.error("poster Id is null");
			return
		}

		const formData = new FormData();
		formData.set('content', this.postContentInput.inputContent);
		formData.set('posterId', String(posterId));
		
		if(this.fileUploadComponent.getFiles().length>0){
			this.fileUploadComponent.getFiles().forEach((file: File) => {
				formData.append('attachmentList', file);
			});
		}
		formData.forEach((value, key) => {
		console.log(key, value);
		});
		this.postDataService.createPost(formData).subscribe({
		next: (response) => {
			console.log('Post created successfully:', response);
			this.fileUploadComponent.clearFiles();
			this.postContentInput.inputContent = "";
			this.sumbitEvent.emit();
		},
		error: (error) => {
			console.error('Error creating post:', error);
		}
		});
		//console.log("creating post:",post);
	}
	cancel(){
		this.closeEvent.emit();
		console.log("canceled the post creation");
	}
}



