import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { Post } from './posts/post.model';

const BACKEND_URL = environment.apiUrl + 'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number}>();

  constructor(private http: HttpClient,
    private router: Router) { }


  getPosts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    console.log(queryParams);
    this.http.get<{ message: string, posts: any, maxPosts: number }>(
      BACKEND_URL + queryParams
    )
      .pipe(map((postData) => {
        return { posts: postData.posts.map(post => {
          return new Post(post._id, post.title, post.content, post.imagePath, post.creator);

        }),
         maxPosts: postData.maxPosts};
      }))
      .subscribe(transformedPosts => {
        console.log(transformedPosts);
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPosts.maxPosts
        });
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.postId === id)};
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string}>
    (BACKEND_URL + id) // BACKEND_URL + '/'
      .pipe(map(postData => {
        return new Post(postData._id, postData.title, postData.content, postData.imagePath, postData.creator);
      }));
  }

  addPost(post: Post, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);

    this.http.post<{ message: string, post: Post }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);

      });
  }

  updatePost(post: Post, image: File | string) {

    let postData: FormData | Post;

    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', post.postId);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
      postData.append('creator', post.creator);
    } else {
      postData = new Post(post.postId, post.title, post.content, image, post.creator);
    }
    this.http.patch(BACKEND_URL + post.postId, postData) // BACKEND_URL + '/'
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }


  deletePost(id: string) {
    return this.http.delete(BACKEND_URL + id); // BACKEND_URL + '/'
  }

}
