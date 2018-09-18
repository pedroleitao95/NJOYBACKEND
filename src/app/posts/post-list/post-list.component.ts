import { AuthService } from './../../auth.service';
import { PostsService } from './../../posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './../post.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [
    // {title: 'First Post', content: 'This is the first post\'s content'},
    // {title: 'Second Post', content: 'This is the Second post\'s content'},
    // {title: 'Third Post', content: 'This is the Third post\'s content'}
  ];

  isLoading = false;
  totalPosts = 0;
  totalPostPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;


  constructor(public postsService: PostsService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.totalPostPerPage, this.currentPage);
    this.userId = this.authService.userID;
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe(
        (postData: { posts: Post[], postCount: number }) => {
          this.isLoading = false;
          this.totalPosts = postData.postCount;
          this.posts = postData.posts;
        }
      );
    this.userIsAuthenticated = this.authService.authStatus;
    this.authStatusSub = this.authService._authStatusListener
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.userID;
      });
  }

  onDeletePost(post: Post) {
    this.isLoading = true;
    this.postsService.deletePost(post.postId)
      .subscribe(() => {
        this.postsService.getPosts(this.totalPostPerPage, this.currentPage);
      }, () => {
        this.isLoading = false;
      } );
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.totalPostPerPage = pageData.pageSize;
    this.postsService.getPosts(this.totalPostPerPage, this.currentPage);
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
