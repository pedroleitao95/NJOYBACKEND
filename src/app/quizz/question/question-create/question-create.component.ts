import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  questionTypes: string[] = ['Multiple Choice', 'Truth/False', 'Open writing'];
  choosenQuestionType = '';
  multipleChoice: string[] = [];

  form: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {

    // this.form = this.fb.group({

    // })
  }

  addChoice() {

  }

}
