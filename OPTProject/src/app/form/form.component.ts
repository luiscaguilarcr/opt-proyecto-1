import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';
import { Answer } from '../models/answer';
import { AnswersService } from '../services/answers/answers.service';
import { Router } from '@angular/router';
import { user } from '../models/user';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  numeroActual : number =  1;

  constructor(
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: Router
  ) {
    this.user = this.user;

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      selectedQuestion: ['', Validators.required]
    });

    this.questionsService.getQuestions().subscribe(
      response => {

        this.questions = response;
        console.log(response);
        this.finish(); // Llamar al método finish() después de cargar las preguntas
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.numeroActual++;
      if (this.numeroActual === 37) {
        this.numeroActual= 1;
      }
    this.selectedAnswer = 1; // Reiniciar el valor seleccionado al cambiar de pregunta
    }


  finish() {
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
