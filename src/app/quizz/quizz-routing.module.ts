import { QuizzComponent } from './quizz.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuizzListComponent } from './quizz-list/quizz-list.component';
import { QuizzCreateComponent } from './quizz-create/quizz-create.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: QuizzComponent
  },
  {
    path: 'create',
    component: QuizzCreateComponent
  },
  {
    path: 'list',
    component: QuizzListComponent
  },
  {
    path: 'edit/:id',
    component: QuizzCreateComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class QuizzRoutingModule {

}
