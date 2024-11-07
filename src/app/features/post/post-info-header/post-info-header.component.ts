import { Component, Input } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-post-info-header',
  templateUrl: './post-info-header.component.html',
  styleUrl: './post-info-header.component.css',
})
export class PostInfoHeaderComponent {
  @Input() userId!: string;
  @Input() username: string = '';
  @Input() fullname!: string;
  @Input() pic!: string;
  @Input() createdAt: string = '';
  @Input() role?: string;

  ngOnInit(){
  }

  getCreatedAt() {
    const updatedAt = this.createdAt;
    // First, check if updatedAt is a valid date string or timestamp
    const modifiedDate = new Date(updatedAt);

    // Check if the date is invalid
    if (isNaN(modifiedDate.getTime())) {
      // console.error('Invalid date:', updatedAt);
      // Handle invalid date, perhaps return a fallback message or undefined
      return 'Date not available';
    }

    const now = new Date();
    const diffInMs = now.getTime() - modifiedDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    let isPlural = '';
    if (diffInDays < 7) {
      // Less than a week, show relative time
      if (diffInDays < 1) {
        const diffInHours = diffInMs / (1000 * 60 * 60);
        if (diffInHours < 1) {
          const diffInMinutes = diffInMs / (1000 * 60);
          if (diffInMinutes >= 2) isPlural = 's';
          return `${Math.floor(diffInMinutes)} minute${isPlural} ago`;
        }
        if (diffInHours >= 2) isPlural = 's';
        return `${Math.floor(diffInHours)} hour${isPlural} ago`;
      }

      if (diffInDays >= 2) isPlural = 's';
      return `${Math.floor(diffInDays)} day${isPlural} ago`;
    } else {
      // More than a week, show formatted date
      return format(modifiedDate, 'dd MMMM, yyyy');
    }
  }
}
