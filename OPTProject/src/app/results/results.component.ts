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

  data: any;
  predominant: any = [];

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
                intelligence.name === item.intelligence_name ? this.predominant.push({"name": item.intelligence_name, "description": intelligence.description}) : null;
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

}
