import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SectionModalComponent } from './section-modal/section-modal.component';
import { SectionModalFormComponent } from './section-modal-form/section-modal-form.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PostModule } from '../post/post.module';
import { CommentLineComponent } from './comment-line/comment-line.component';

@NgModule({
  imports: [CommonModule, SharedModule, PostModule, UserProfileRoutingModule, ToastModule],
  providers: [MessageService],
  declarations: [
    ProfilePageComponent,
    SectionModalComponent,
    SectionModalFormComponent,
    UpdateProfileComponent,
    CommentLineComponent,
  ],
})
export class UserProfileModule {}
