import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions/questions.service';
import { question } from '../models/question';
import { Answer } from '../models/answer';
import { UserAnswer } from '../models/useranswer';
import { AnswersService } from '../services/answers/answers.service';
import { user } from '../models/user'; // Importa el modelo 'user'

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
  user: user = new user(); // Declara e inicializa la propiedad 'user' con un nuevo objeto 'user'

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
    let userAnswers: UserAnswer[];

    // Obtener el ID del usuario desde la propiedad 'user' en tu componente
    const userId = this.user.email; // Suponiendo que el email del usuario sea el ID

    userAnswers = this.questions.map((question) => {
      const selectedOption = this.selectedAnswer !== undefined ? this.selectedAnswer : null;
      const weight: number = selectedOption || 0;

      const answer: Answer = {
        question_id: question._id,
        answer: selectedOption,
        weight: weight
      };

      return {
        user_id: userId,
        ...answer
      };
    });

    console.log('Respuestas seleccionadas:', userAnswers);

    this.answersService.putAnswers(userAnswers).subscribe(
      (response) => {
        console.log('Respuestas de usuario guardadas:', response);
        // Realizar acciones finales o redireccionar a otra página
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