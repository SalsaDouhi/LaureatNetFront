import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-post-attachements',
  templateUrl: './post-attachements.component.html',
  styleUrl: './post-attachements.component.css'
})
export class PostAttachementsComponent{
  @Input() attachments: string[]=[];
  show = false;
  @Input() local:boolean=false;
  ngOnInit(){
    if(!this.local){
      this.attachments = this.attachments.map(att=>{return 'http://localhost:8080/api/v1/files/'+att;})
    }
  }
  toggleShow(){
    this.show = !this.show;
  }
  onToggleCarousel(event: any) {
    this.toggleShow();
  }
}
