import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ScientificArticleService } from '../../../core/services/scientificArticleData.service';
import { PostContentInputComponent } from '../post-content-input/post-content-input.component';
import { AuthService } from '../../../core/services/auth.service';
import { ScientificArticleShowDTO } from '../../../shared/interfaces/ScientificArticleShowMV';
import { ScientificArticlePostService } from '../../../core/services/scientificArticlePostData.service';
import { ScientificArticlePostNewComponent } from './scientific-article-post-new/scientific-article-post-new.component';
import { ScientificArticlePostExistingComponent } from './scientific-article-post-existing/scientific-article-post-existing.component';
import { TechnologyDataService } from '../../../core/services/technologyData.service';
import { Technology } from '../../../shared/interfaces/Technology';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-scientific-article-post-creation',
  templateUrl: './scientific-article-post-creation.component.html',
  styleUrl: './scientific-article-post-creation.component.css'
})
export class ScientificArticlePostCreationComponent{
    @ViewChild(PostContentInputComponent) postContentInput!: PostContentInputComponent;
    @ViewChild(ScientificArticlePostNewComponent) newArticleComponent!: ScientificArticlePostNewComponent;
    @ViewChild(ScientificArticlePostExistingComponent) existingArticleComponent!: ScientificArticlePostExistingComponent;
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();
    @Output() sumbitEvent :EventEmitter<void> = new EventEmitter();

    username: string = '';
    scientificArticlePostType: string = '';
    userId: number = 0;
  
    existingArticles:ScientificArticleShowDTO[] = [];
    formData:FormData = new FormData();

    constructor(
        private articlePostService: ScientificArticlePostService,
        private articleService: ScientificArticleService, 
        private authService: AuthService,
        protected profileService: ProfileService
    ) {}
  
    ngOnInit() {
      this.userId = this.authService.getCurrentUserId()!;
      this.articleService.getArticlesByPublisherId(this.userId).subscribe(articles=>{
        this.existingArticles = articles;
      });      
    }

  
    createScientificArticlePost(){
        if(this.scientificArticlePostType === 'new'){
            this.createScientificArticlePostNew();
        }else if(this.scientificArticlePostType === 'existing'){
            this.existingArticleComponent.submitForm();
            this.formData = this.existingArticleComponent.formData;
            this.createScientificArticlePostExisting();
        }
        

    }

    createScientificArticlePostNew(){

        this.newArticleComponent.submitForm();
        this.formData = this.newArticleComponent.formData;

        this.formData.set('posterId', String(this.userId));
        this.formData.set('content', this.postContentInput.inputContent);

        this.formData.forEach((data,key)=>{console.log(key,data)})

        this.articlePostService.createScientificArticlePostNewArticle(this.formData).subscribe(
            next => this.sumbitEvent.emit(),
            error => console.error('Error creating scientific article post', error)
        );
    }

    createScientificArticlePostExisting(){
        this.formData.set('posterId', String(this.userId));
        this.formData.set('content', this.postContentInput.inputContent);
        this.articlePostService.createScientificArticlePost(this.formData).subscribe(
            response => this.sumbitEvent.emit(),
            error => console.error('Error creating scientific article post', error)
        );
    }
    
  
    cancel() {
      this.closeEvent.emit()
    }
  }