import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';
import { Answer } from '../models/answer';
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
  ) { }

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

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswer = 1; // Reiniciar el valor seleccionado al cambiar de pregunta
  }

  finish() {
    console.log('¡Test terminado!');
    const selectedQuestion = this.questions[this.currentQuestionIndex];
    const answer: Answer = {
      question_id: selectedQuestion._id,
      answer: this.selectedAnswer
    };
    this.answers.push(answer);

    // Guardar las respuestas en la API
    this.answersService.putAnswers(this.answers).subscribe(
      response => {
        console.log('Respuestas guardadas:', response);
        // Realizar acciones finales o redireccionar a otra página
      },
      error => {
        console.log('Error al guardar respuestas:', error);
      }
    );
  }

  // Obtener las opciones de respuesta del 1 al 10
  getOptions(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}
