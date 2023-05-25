import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService) {

  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('maxlevtov@gmail.com', [
        Validators.required, Validators.minLength(2),
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    });

  }

  register() {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(['user/login']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['user/login']);
        }
      });
    }

  }


}
