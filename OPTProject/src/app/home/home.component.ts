import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ResultsService} from "../services/results/results.service";
import {async} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private resultsService: ResultsService, private authService: AuthService) {}
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

  logout() {
    this.authService.removeToken();
    this.router.navigate(["/sign-in"]);
  }

}




