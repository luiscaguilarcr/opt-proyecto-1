import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ResultsService} from "../services/results/results.service";
import {IntelligenceService} from "../services/intelligences/intelligence.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(private resultsService: ResultsService, private router: Router, private intelligencesService: IntelligenceService) {}

  data: any;
  predominants: any = [];
  matches: any = [];

  intelligences: any = [
    {"name": "Inteligencia naturalista", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+naturalista.jpeg"},
    {"name": "Inteligencia musical", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+musical.jpeg"},
    {"name": "Inteligencia lógico matemática", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+lógico+matemática.jpeg"},
    {"name": "Inteligencia lingüístico-verbal", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+lingu%CC%88i%CC%81stico+verbal.jpeg"},
    {"name": "Inteligencia intrapersonal", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+intrapersonal.jpeg"},
    {"name": "Inteligencia interpersonal", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+interpersonal.jpeg"},
    {"name": "Inteligencia existencial", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+existencial.jpeg"},
    {"name": "Inteligencia espacial", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+espacial.jpeg"},
    {"name": "Inteligencia emocional", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+emocional.jpeg"},
    {"name": "Inteligencia creativa", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+creativa.jpeg"},
    {"name": "Inteligencia corporal cinestésica", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+corporal+cinestésica.jpeg"},
    {"name": "Inteligencia colaborativa", "url": "https://no-cache.s3.us-east-2.amazonaws.com/laguilar-home/demos/tests/images/Inteligencia+colaborativa.jpeg"}
  ]

  ngOnInit(): void {
    this.data = this.resultsService.results

    const getUrlByName = (name: string) => {
      const intelligence = this.intelligences.find((intelligence: { name: string; }) => intelligence.name === name)
      return intelligence ? intelligence.url : undefined;
    }

    if(this.data.length === 0) {
      this.router.navigate(['/home']);
    } else {
      this.intelligencesService.getIntelligences().subscribe( {
        next: (response) => {
          this.data.items.forEach((item: any, index: number) => {
            if(index <= 2) {
              response.forEach((intelligence:any) => {
                console.log(item.intelligence_name)
                intelligence.name === item.intelligence_name ? this.predominants.push({"name": item.intelligence_name, "description": intelligence.description, "image": getUrlByName(item.intelligence_name)}) : null;
              })
            }
          })
        },
        error: (error) => {
          console.log("Error: ", error)
        }
      }
      );

      this.intelligencesService.getMatches().subscribe( {
          next: (response) => {
            response.length > 5 ? this.matches = response.slice(0, 4) : this.matches = response;
          },
          error: (error) => {
            console.log("Error: ", error)
          }
        }
      );
    }
  }

  goHome() {
    this.router.navigate(["/home"]);
  }

  redirectToEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }

}
