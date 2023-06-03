import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';
import { createUser } from '../models/user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    
    const user: createUser = {
      full_name: this.signUpForm.value.full_name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    this.usersService.singUp(user).subscribe(
      response => {
        Swal.fire('Registrado con éxito')
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.log("Error", error)
      }

    ) 
  }

}
