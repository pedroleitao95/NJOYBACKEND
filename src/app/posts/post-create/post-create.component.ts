import { AuthService } from './../../auth.service';
import { Subscription } from 'rxjs';
import { PostsService } from './../../posts.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredContent  = '';
  enteredTitle  = '';
  private mode = 'create';
  private postId: string;
  public post: Post;
  isLoading = false;
  private authStatusSub: Subscription;

  imagePreview: string;
  form: FormGroup;

  constructor(public postService: PostsService,
    public route: ActivatedRoute,
    public authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService._authStatusListener
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    // Build the form
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null,
        {
          validators: [Validators.required],
          asyncValidators: [mimeType]})
    });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
          if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
            this.isLoading = true;
            this.postService.getPost(this.postId)
              .subscribe(post => {
                this.isLoading = false;
                this.post = post;
                this.form.setValue({
                  'title': this.post.title,
                  'content': this.post.content,
                  'image': this.post.image
                });
              });
          } else {
            this.mode = 'create';
            this.postId = null;
          }
      });
  }


  onSavePost() {

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const post = new Post(null, this.form.value.title, this.form.value.content, null, null);

    if (this.mode === 'create') {
      this.postService.addPost(post, this.form.value.image);
    } else {
      post.postId = this.postId;
      console.log(post.postId);
      this.postService.updatePost(post, this.form.value.image);

    }
    this.form.reset();

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image': file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
