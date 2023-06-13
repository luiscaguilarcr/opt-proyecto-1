import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from "../services/auth/auth.service";

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

    this.usersService.signIn(email, password).subscribe( {
        next: (data) => {
          this.authService.setToken(data);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          Swal.fire('Error de inicio de sesión')
          this.signInForm = this.formBuilder.group({
            email: [''],
            password: ['']
          });
        }
      }
    );
  }
}
