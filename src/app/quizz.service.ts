import { Quiz } from './quizz/quizz.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private quizzes: Quiz[] = [];

  constructor() { }
}
