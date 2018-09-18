import { QuizzRoutingModule } from './quizz-routing.module';
import { AuthRoutingModule } from './../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzCreateComponent } from './quizz-create/quizz-create.component';
import { QuizzListComponent } from './quizz-list/quizz-list.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuizzComponent } from './quizz.component';
import { QuizzDetailsComponent } from './quizz-details/quizz-details.component';
import { QuestionCreateComponent } from './question/question-create/question-create.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    QuizzRoutingModule
  ],
  declarations: [
    QuizzCreateComponent,
    QuizzListComponent,
    QuestionListComponent,
    QuizzComponent,
    QuizzDetailsComponent,
    QuestionCreateComponent]
})
export class QuizzModule { }
