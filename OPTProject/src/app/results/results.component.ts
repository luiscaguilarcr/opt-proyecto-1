import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ResultsService} from "../services/results/results.service";
import * as Chart from 'chart.js';
import {IntelligenceService} from "../services/intelligences/intelligence.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(private resultsService: ResultsService, private router: Router, private intelligencesService: IntelligenceService) {}

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  data: any;
  predominant: any = [];
  chart!: Chart;

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

  ngAfterViewInit() {
    //this.createChart();
  }

  createChart() {
    const chartCanvas = this.chartCanvas.nativeElement.getContext('2d');
    if (!chartCanvas) {
      console.log("out")
      return;
    }

    this.chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: this.data.items.map((item: { intelligence_name: { toString: () => any; }; }) => item.intelligence_name),
        datasets: [{
          label: 'Peso',
          data: this.data.items.map((item: { weight: any; }) => item.weight),
          backgroundColor: 'rgba(255,206,0,0.71)',
          borderColor: 'rgb(255,255,255)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'left'
        }
      }
    });
  }
}
