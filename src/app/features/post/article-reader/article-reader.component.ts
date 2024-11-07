import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { PdfService } from '../../../core/services/pdf.service';

@Component({
	selector: 'app-article-reader',
	templateUrl: './article-reader.component.html',
	styleUrl: './article-reader.component.css'
})
export class ArticleReaderComponent {
	@Input() pdfUrl!: string;
	safePdfData: any = null;
  
	constructor(private pdfDownloadService: PdfService, private _sanitizer: DomSanitizer) { }
  
	ngOnInit() {
		if(this.pdfUrl!==''){
			this.pdfDownloadService.downloadPdf(this.pdfUrl).subscribe(blob => {
				this.safePdfData = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
	  		});
		}

	}
}
