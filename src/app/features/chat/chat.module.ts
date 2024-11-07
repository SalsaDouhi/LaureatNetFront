import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, ChatRoutingModule],
})
export class ChatModule {}
