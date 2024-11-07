import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { OfferPostCreationComponent } from './offer-post-creation/offer-post-creation.component';
import { ScientificArticlePostCreationComponent } from './scientific-article-post-creation/scientific-article-post-creation.component';
import { StagePageComponent } from './stage-page/stage-page.component';
import { WorkPageComponent } from './work-page/work-page.component';

const routes: Routes = [
  // { path: '', component: PostContainerComponent },
  { path: '', component: PostListComponent },
  { path: 'comments', component: CommentsModalComponent },
  { path: 'create', component: PostCreationComponent },
  { path: 'create-offer', component: OfferPostCreationComponent },
  { path: 'create-sc', component: ScientificArticlePostCreationComponent },
  { path: 'internships', component: StagePageComponent },
  { path: 'jobs', component: WorkPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
