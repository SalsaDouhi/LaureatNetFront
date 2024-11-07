import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { SubscriptionListComponent } from "./subscription-list/subscription-list.component";
import { SubscriptionRoutingModule } from "./subscription-routing.module";


@NgModule({
  declarations: [
    SubscriptionListComponent
  ],
  
  providers: [MessageService],

  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
