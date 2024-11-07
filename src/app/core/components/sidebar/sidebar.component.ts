import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ro } from 'date-fns/locale';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  currentUserId: number = 0;
  role: string = 'user';

  constructor(
    private toggleService: ToggleService,
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId() ?? 0;
  }

  ngAfterViewInit() {
    $('#sidenav').metisMenu();
    const currentUserRoles = this.authService.getCurrentUserRoles();
    if (currentUserRoles && currentUserRoles.includes('ROLE_ADMIN')) {
      this.role = 'admin';
    }
  }

  onMouseEnter() {
    this.toggleService.hoverSidebar(true);
  }

  onMouseLeave() {
    this.toggleService.hoverSidebar(false);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isActive(routes: string[]): boolean {
    return routes.some((route) => this.router.url.includes(route));
  }

  isAdmin() {
    const currentUserRoles = this.authService.getCurrentUserRoles();
    if (currentUserRoles && currentUserRoles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  getMyProfileRoute() {
    return '/profiles/' + this.currentUserId;
  }
}
