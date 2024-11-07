import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { PostModule } from '../post/post.module';

@NgModule({
  imports: [CommonModule, SharedModule, PostModule, HomePageRoutingModule],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
