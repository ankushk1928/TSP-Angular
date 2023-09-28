import { ListOfMentorComponent } from '../list-of-mentor/list-of-mentor.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-mentee',
  templateUrl: './login-mentee.component.html',
  styleUrls: ['./login-mentee.component.css']
})
export class LoginMenteeComponent implements OnInit {
  loginForm!: FormGroup;

 selectedMode: 'mentee' | 'mentor' = 'mentee';

  menteeSelected: boolean = false;
  mentorSelected: boolean = false;

setMode(mode: 'mentee' | 'mentor') {

    this.selectedMode = mode;
    if (mode === 'mentee') {
      this.menteeSelected = true;
      this.mentorSelected = false;
    } else if (mode === 'mentor') {
      this.mentorSelected = true;
      this.menteeSelected = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private AuthService: AuthService
      ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitMentee() {
    console.log("mentee");
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
      });


      this.AuthService.LoginMentee(formData.email, formData.password)
        .subscribe(
          (response: any) => {
       
            console.log('Login successful:', response);
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You are now logged in.',
              width: '400px',  confirmButtonText: 'Okay'
            }).then((result) => {
              if (result.isConfirmed) {
                this.navigateToSearchBySkill();
                sessionStorage.setItem('menteeId', this.loginForm.get('email')?.value )
              }

            });

            
          },
          (error: any) => {
         
            console.error('Login failed:', error);
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Invalid email or password. Please try again.',
              width: '400px'
            

            });

           
          }
        );
    }
  }

  navigateToRegisterMentee() {
  
    this.router.navigate(['/menteeRegister']); 
  }

  navigateToRegisterMentor() {
    this.router.navigate(['/mentorRegister']); 
  }

  navigateToSearchBySkill() {
   
    this.router.navigate(['/searchBySkills']); 
  }
  navigateToViewMentor(id:number) {
    console.log("viewMentor called from login");
    this.router.navigate(['mentor-view', id])
  }

  


  onSubmitMentor(){
    console.log("mentor");
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

  
      const params = new HttpParams()
        .set('email', formData.email)
        .set('password', formData.password);


      const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
      });

     
      this.AuthService.LoginMentor(formData.email,formData.password)
        .subscribe(
          (response: any) => {
           
            console.log('Login successful:', response);
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You are now logged in.',
              width: '400px',
              confirmButtonText: 'Okay'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log("Successfully login by mentor"+response.data.employeeId);
                
                this.navigateToViewMentor(response.data.employeeId);
                sessionStorage.setItem('mentorId', this.loginForm.get('email')?.value )
              }

            });
         


          
          },
          (error:any) => {
      
            console.error('Login failed:', error);
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Invalid email or password. Please try again.',
              width: '400px'
            });

            
          }
        );
    }
  }
}
