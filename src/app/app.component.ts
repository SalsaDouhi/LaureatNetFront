import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  isLoginRoute: boolean = true;
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  private ps!: PerfectScrollbar;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginRoute = event.urlAfterRedirects.includes('/login');
      });
  }

  ngAfterViewInit() {
    // this.ps = new PerfectScrollbar(this.scrollContainer.nativeElement);

    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.scrollToTop();
    //   });
  }

  // scrollToTop() {
  //   this.scrollContainer.nativeElement.scrollTop = 0;
  //   this.ps.update();
  // }
}
