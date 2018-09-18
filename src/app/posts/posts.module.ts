import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent
  ],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ]
})
export class PostsModule {

}
