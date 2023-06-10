import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';
import { Answer } from '../models/answer';
import { AnswersService } from '../services/answers/answers.service';
import { Router } from '@angular/router';
import { user } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  questions: question[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: number = 1; // Valor predeterminado para el primer radio button
  answers: Answer[] = [];
  user: user = new user(); // Objeto User para almacenar el email del usuario
  actualNumber : number =  1;

  constructor(
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: Router,
  ) {
    this.user = this.user;
  }

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(
      response => {
        this.questions = response;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  nextQuestion() {
    if (this.questions[this.currentQuestionIndex].answer === undefined) {
      // No se ha seleccionado una respuesta, muestra un mensaje de error o realiza alguna otra acción    
      console.log('Debes seleccionar una respuesta antes de continuar.')
      return;
    }
    this.currentQuestionIndex++;
    this.actualNumber++;
      if (this.actualNumber === 37) {
        this.actualNumber= 1;
      }
    this.selectedAnswer = 1; // Reiniciar el valor seleccionado al cambiar de pregunta
    }

  onSubmit() {
    if (this.questions[this.currentQuestionIndex].answer === undefined) {
      // No se ha seleccionado una respuesta, muestra un mensaje de error o realiza alguna otra acción    
      Swal.fire('Debes seleccionar una respuesta antes de continuar.')
      return;
    }
    const userAnswers: Answer[] = this.questions.map((question) => {
      const selectedOption = question.answer || null; // Utiliza la propiedad "answer" de la pregunta en lugar de "selectedAnswer"
      const weight: number = selectedOption || 0;

      return {
        "question_id": question._id,
        "weight": weight
      };
    });

    this.answersService.putAnswers(userAnswers).subscribe(
      (response) => {
        console.log('Respuestas de usuario guardadas:', response);
        this.router.navigate(['/results']);
      },
      (error) => {
        console.log('Error al guardar respuestas de usuario:', error);
      }
    );
  }

  getOptions(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }

}
