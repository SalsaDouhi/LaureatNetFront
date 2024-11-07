import { Component, HostListener, Input, OnInit, input } from '@angular/core';
import { Post } from '../../../shared/interfaces/Post';
import { PostDataService } from '../../../core/services/postData.service';
import { JobOfferDataService } from '../../../core/services/JobOfferData.service';
import { InternshipOfferDataService } from '../../../core/services/InternshipOfferData.service';
import { ScientificArticlePostService } from '../../../core/services/scientificArticlePostData.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  animatePostList = false;
  @Input() mode: String = 'home';
  @Input() posts: Post[] = [];
  userId: number = 0;
  currFilter: string = 'all';
  page: number = 0;

  constructor(
    private authService: AuthService,
    private postDataService: PostDataService,
    private scDataService: ScientificArticlePostService,
    private jobOfferDataService: JobOfferDataService,
    private internshipOfferDataService: InternshipOfferDataService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.mode == 'work') {
      this.currFilter = 'JobOffer';
      this.getPostsWithFilter();
      return;
    }

    if (this.mode == 'stage') {
      this.currFilter = 'InternshipOffer';
      this.getPostsWithFilter();
      return;
    }

    if (this.mode != 'profile') {
      this.getPostsWithFilter();
    }
  }
  getPostsWithFilter(changed = false) {
    if (this.currFilter === 'all') {
      this.postDataService
        .getAllPostsSorted(this.userId, this.page)
        .subscribe((newPosts) => {
          if (changed) {
            this.posts = [];
          }
          this.posts.push(...newPosts);
          console.log(this.posts);
        });
    } else if (this.currFilter === 'InternshipOffer') {
      this.internshipOfferDataService
        .getAllInternshipOffersSorted(this.userId, this.page)
        .subscribe((newPosts) => {
          if (changed) {
            this.posts = [];
          }
          this.posts.push(...newPosts);
          console.log(this.posts);
        });
    } else if (this.currFilter === 'JobOffer') {
      this.jobOfferDataService
        .getAllJobOffersSorted(this.userId, this.page)
        .subscribe((newPosts) => {
          if (changed) {
            this.posts = [];
          }
          this.posts.push(...newPosts);
          console.log(this.posts);
        });
    } else if (this.currFilter === 'ScientificArticlePost') {
      this.scDataService
        .getAllScientificArticlePostsSorted(this.userId, this.page)
        .subscribe((newPosts) => {
          if (changed) {
            this.posts = [];
          }
          this.posts.push(...newPosts);
          console.log(this.posts);
        });
    }
  }
  onFilterChange(event: any) {
    console.log('changing');
    if (this.currFilter != event) {
      this.currFilter = event;
      this.animatePostList = true;
      this.page = 0;
      this.getPostsWithFilter(true);
      setTimeout(() => (this.animatePostList = false), 250);
      console.log('changed');
    }
  }
  onPostDeletion(id: any) {
    console.log('deleted with id', id);
    this.posts = this.posts.filter((p) => p.id !== id);
  }

  onScroll(): void {
    this.page++;
    this.getPostsWithFilter();
  }
}
