import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (true) {
      //this.router.navigate(["/home"]);
    }
  }
}
