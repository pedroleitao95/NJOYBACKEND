import { Quiz } from './quizz.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizzes = [
    {
      title: 'Quizz1',
      content: 'My Quizz'
    },
    {
      title: 'Quizz2',
      content: 'My Quizz2'
    },
    {
      title: 'Quizz2',
      content: 'My Quizz2'
    },
    {
      title: 'Quizz2',
      content: 'My Quizz2'
    },
    {
      title: 'Quizz2',
      content: 'My Quizz2'
    },

  ];



  constructor() { }

  ngOnInit() {
  }



  onDelete() {


  }
}
