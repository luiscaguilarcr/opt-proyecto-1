import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ResultsService} from "../services/results/results.service";
import * as Chart from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(private resultsService: ResultsService) {}

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private data: any;
  chart!: Chart;

  ngOnInit(): void {
    this.data = this.resultsService.results
    console.log(this.data)
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const chartCanvas = this.chartCanvas.nativeElement.getContext('2d');
    if (!chartCanvas) {
      console.log("out")
      return;
    }

    this.chart = new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: this.data.items.map((item: { intelligence_code: { toString: () => any; }; }) => item.intelligence_code.toString()),
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
