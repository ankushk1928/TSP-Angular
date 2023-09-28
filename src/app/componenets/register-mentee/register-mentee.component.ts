import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register-mentee.component.html',
  styleUrls: ['./register-mentee.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  public registrationSuccess:boolean=false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      employeeId: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)],],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]], 
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],  
      email: ['', [Validators.required, Validators.pattern(  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*password|12345678|qwerty)(?=.{8,})/)]], 
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);
  
      const formData = this.signupForm.value;
      this.authService.registerMentee(formData).subscribe(
        (response) => {
          if (response.status === 200) { 
            this.registrationSuccess = true;
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'You can now sign in with your credentials.',

            });
            this.router.navigate([`login`])
            this.signupForm.reset();

            console.log('Registration success', this.registrationSuccess);
          }
          console.log('Response from the backend:', response);
        },
        (error) =>
         {
          console.error('Error from the backend:', error);
          const errorMessage = error.error && error.error.message
          ? error.error.message
          : 'An error occurred during registration. Please try again later.';
        
      
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
          width:'400px',
        });

        }
      );
    } else {
      console.error('Validation failed');
  
      Object.keys(this.signupForm.controls).forEach((key) => {
        const control = this.signupForm.get(key);
        if (control && control.invalid) {
          console.error(`Validation error for ${key}:`, control.errors);
        }
      });
    }
  }
   
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegisterMentor(){
    this.router.navigate(['/mentorRegister']);
  }


  navigateToSearchBySkill() {
   
    this.router.navigate(['/searchBySkills']); 
  }
}
