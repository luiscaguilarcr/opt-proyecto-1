import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
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
  imageUrl: string = "https://www.sca.org/wp-content/uploads/2019/12/clash_lg-1024x682-2.jpg";
  data: any;
  predominants: any = [];
  users: any = [{"name": "Luis Aguilar 1", "email": "lag1@em.com"}, {"name": "Luis Aguilar 2", "email": "lag2@em.com"}, {"name": "Luis Aguilar 3", "email": "lag3@em.com"}, {"name": "Luis Aguilar 4", "email": "lag4@em.com"}, {"name": "Luis Aguilar 5", "email": "lag5@em.com"}];

  ngOnInit(): void {
    this.data = this.resultsService.results
    console.log(this.data)
    if(this.data.length === 0) {
      this.router.navigate(['/home']);
    } else {
      this.intelligencesService.getIntelligences().subscribe( {
        next: (response) => {
          this.data.items.forEach((item: any, index: number) => {
            if(index <= 2) {
              response.forEach((intelligence:any) => {
                intelligence.name === item.intelligence_name ? this.predominants.push({"name": item.intelligence_name, "description": intelligence.description}) : null;
              })
            }
          })
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

}
