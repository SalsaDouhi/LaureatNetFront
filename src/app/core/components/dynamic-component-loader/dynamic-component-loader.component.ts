import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, ComponentRef, EventEmitter, Output } from '@angular/core';
import { PostCreationComponent } from '../../../features/post/post-creation/post-creation.component';
import { OfferPostCreationComponent } from '../../../features/post/offer-post-creation/offer-post-creation.component';
import { ScientificArticlePostCreationComponent } from '../../../features/post/scientific-article-post-creation/scientific-article-post-creation.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-dynamic-component-loader',
  template: `<ng-template #dynamicComponentContainer></ng-template>`,
})
export class DynamicComponentLoaderComponent implements OnInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  @Input() componentType!: string;

  private componentMappings: { [key: string]: Type<any> } = {
    normalPost: PostCreationComponent,
    offerPost: OfferPostCreationComponent,
    scientificArticlePost: ScientificArticlePostCreationComponent,
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent(this.componentType);
  }

  loadComponent(componentType: string): void {
    this.container.clear();
    const component = this.componentMappings[componentType];
    if (component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.container.createComponent(factory);
      this.listenToComponentEvents(componentRef);
    }
  }
  listenToComponentEvents(componentRef: ComponentRef<any>) {
    componentRef.instance.closeEvent.subscribe(() => {
      this.close.emit();
      this.container.clear();
    });
    componentRef.instance.sumbitEvent.subscribe(() => {
      this.submit.emit();
      this.container.clear();
    });
  }
}