import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';

@Component({
  selector: 'app-formulario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  questions: question[] = [];
  currentQuestionIndex: number = 0;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
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

  previousQuestion() {
    this.currentQuestionIndex--;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  finish() {
    console.log('¡Test terminado!');
    // Realizar acciones finales o redireccionar a otra página
  }
}
