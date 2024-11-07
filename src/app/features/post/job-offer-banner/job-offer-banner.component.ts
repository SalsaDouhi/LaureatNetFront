import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-offer-banner',
  templateUrl: './job-offer-banner.component.html',
  styleUrl: './job-offer-banner.component.css',
})
export class JobOfferBannerComponent {
  @Input() companyName?: string;
  @Input() jobTitle?: string;
  @Input() startDate?: string;
  @Input() endDate?: string;
  @Input() companyLogoUrl?: string;

  getCompanyLogo() {
    if (!this.companyLogoUrl || this.companyLogoUrl == '') return 'assets/images/no_logo.png';

    return 'http://localhost:8080/api/v1/files/' + this.companyLogoUrl;
  }
}
