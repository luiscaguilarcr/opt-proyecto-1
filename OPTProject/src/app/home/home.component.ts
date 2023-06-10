import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ResultsService} from "../services/results/results.service";
import {async} from "rxjs";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private resultsService: ResultsService) {}
  hasResults = false;

  ngOnInit(): void {
    this.resultsService.getResults().subscribe(
      response => {
        this.resultsService.results = response;
        this.hasResults = true
      },
      (error) => {
        this.hasResults = false
      }
    );
  }

}




