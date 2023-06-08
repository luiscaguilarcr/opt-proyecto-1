import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';
import { Answer } from '../models/answer';
import { UserAnswer } from '../models/useranswer';
import { AnswersService } from '../services/answers/answers.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  questions: question[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: number = 1; // Valor predeterminado para el primer radio button
  answers: Answer[] = [];

  constructor(
    private questionsService: QuestionsService,
    private answersService: AnswersService
  ) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(
      (response) => {
        this.questions = response;
        console.log(response);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswer = 1; // Reiniciar el valor seleccionado al cambiar de pregunta
  }

  finish() {
    console.log('¡Test terminado!');
    const selectedQuestion = this.questions[this.currentQuestionIndex];
    const answer: Answer = {
      question_id: selectedQuestion._id,
      answer: this.selectedAnswer !== undefined ? this.selectedAnswer : null,
      weight: selectedQuestion.weight
    };
    this.answers.push({...answer});

    // Guardar la respuesta de usuario en la API
    const userAnswer: UserAnswer = {
      user_id: 'string', // Reemplazar con el ID del usuario
      ...answer
    };

    this.answersService.putAnswers([userAnswer]).subscribe(
      (response) => {
        console.log('Respuesta de usuario guardada:', response);
        // Realizar acciones finales o redireccionar a otra página
      },
      (error) => {
        console.log('Error al guardar respuesta de usuario:', error);
      }
    );
  }

  getOptions(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}