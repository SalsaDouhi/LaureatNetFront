import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostAttachementsComponent } from './post-attachements/post-attachements.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobOfferBannerComponent } from './job-offer-banner/job-offer-banner.component';
import { InternshipOfferBannerComponent } from './internship-offer-banner/internship-offer-banner.component';
import { OfferPostCreationComponent } from './offer-post-creation/offer-post-creation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PostContentInputComponent } from './post-content-input/post-content-input.component';
import { OverlayCarouselComponent } from './overlay-carousel/overlay-carousel.component';
import { ScientificArticlePostCreationComponent } from './scientific-article-post-creation/scientific-article-post-creation.component';
import { ScientificArticleBannerComponent } from './scientific-article-banner/scientific-article-banner.component';
import { ArticleReaderComponent } from './article-reader/article-reader.component';
import { PostContainerComponent } from './post-container/post-container.component';
import { InternshipOfferFormComponent } from './offer-post-creation/internship-offer-form/internship-offer-form.component';
import { JobOfferFormComponent } from './offer-post-creation/job-offer-form/job-offer-form.component';
import { ScientificArticlePostExistingComponent } from './scientific-article-post-creation/scientific-article-post-existing/scientific-article-post-existing.component';
import { ScientificArticlePostNewComponent } from './scientific-article-post-creation/scientific-article-post-new/scientific-article-post-new.component';
import { PostTechnologyTagsComponent } from './post-technology-tags/post-technology-tags.component';
import { HomePostFilterHeaderComponent } from './home-post-filter-header/home-post-filter-header.component';
import { PostInfoHeaderComponent } from './post-info-header/post-info-header.component';
import { PostOptionsButtonComponent } from './post-options-button/post-options-button.component';
import { PostLikeAndCommentBarComponent } from './post-like-and-comment-bar/post-like-and-comment-bar.component';
import { CommentBarComponent } from './comment-bar/comment-bar.component';
import { CommentContainerComponent } from './comment-container/comment-container.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StagePageComponent } from './stage-page/stage-page.component';
import { WorkPageComponent } from './work-page/work-page.component';

@NgModule({
  declarations: [
    PostAttachementsComponent,
    PostListComponent,
    CommentsModalComponent,
    PostCreationComponent,
    JobOfferBannerComponent,
    InternshipOfferBannerComponent,
    OfferPostCreationComponent,
    FileUploadComponent,
    PostContentInputComponent,
    OverlayCarouselComponent,
    ScientificArticlePostCreationComponent,
    ScientificArticleBannerComponent,
    ArticleReaderComponent,
    PostContainerComponent,
    InternshipOfferFormComponent,
    JobOfferFormComponent,
    ScientificArticlePostExistingComponent,
    ScientificArticlePostNewComponent,
    PostTechnologyTagsComponent,
    HomePostFilterHeaderComponent,
    PostInfoHeaderComponent,
    PostOptionsButtonComponent,
    PostLikeAndCommentBarComponent,
    CommentBarComponent,
    CommentContainerComponent,
    StagePageComponent,
    WorkPageComponent,
  ],
  exports: [PostListComponent],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    PostRoutingModule,
    ToastModule,
    InfiniteScrollModule,
  ],
})
export class PostModule {}
