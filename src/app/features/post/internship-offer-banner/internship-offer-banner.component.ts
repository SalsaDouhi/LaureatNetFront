import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-internship-offer-banner',
  templateUrl: './internship-offer-banner.component.html',
  styleUrl: './internship-offer-banner.component.css',
})
export class InternshipOfferBannerComponent {
  @Input() companyName?: string;
  @Input() roleTitle?: string;
  @Input() duration?: string;
  @Input() startDate?: string;
  @Input() endDate?: string;
  @Input() companyLogoUrl?: string;

  getCompanyLogo() {
    if (!this.companyLogoUrl || this.companyLogoUrl == '') return 'assets/images/no_logo.png';

    return 'http://localhost:8080/api/v1/files/' + this.companyLogoUrl;
  }
}
