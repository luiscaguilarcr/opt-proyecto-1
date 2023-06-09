import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  questions: question[] = [];

  constructor(private questionsService: QuestionsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      selectedQuestion: ['', Validators.required]
    });

    this.questionsService.getQuestions().subscribe(
      response => {
        this.questions = response;
        console.log(response);
      },
      error => {
        console.log("Error", error)
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedQuestionId = this.form.get('selectedQuestion')?.value;
      const selectedQuestion = this.questions.find(question => question._id === selectedQuestionId);
      if (selectedQuestion) {
        console.log('Pregunta seleccionada:', selectedQuestion.question);
      }
    }
  }
}

