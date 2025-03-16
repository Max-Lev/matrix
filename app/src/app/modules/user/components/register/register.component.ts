import { Component, Input } from '@angular/core';
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

  @Input() isRegister = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService) {

  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('maxlevtov1@gmail.com', [
        Validators.required, 
        // Validators.minLength(2),
        // Validators.email,
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new FormControl('123456', [
        Validators.required, 
        // Validators.minLength(8),
        // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    });

  }

  register() {
    
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['user/login']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['user/login']);
        }
      });
    }
  }

  manualLogin(registerForm: FormGroup) {

    this.loginService.manualLogin(registerForm.value).subscribe({
      next: (value) => {
        this.router.navigate(['/heroes']);
      },
      error: (err: {statusCode:number,message:string,error:string}) => {
        this.registerForm.setErrors({ 'invalid': true });
      }
    });

  }


}
