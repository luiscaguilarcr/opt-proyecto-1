import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;

    this.usersService.signIn(email, password).subscribe(
      (data) => {
        this.router.navigate(['/home']);
        this.authService.setToken(data);
      },
      error => {
        console.log("Error", error)
      }
    );
  }
}
