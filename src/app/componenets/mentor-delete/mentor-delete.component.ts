import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/mentor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mentor-delete',
  templateUrl: './mentor-delete.component.html',
  styleUrls: ['./mentor-delete.component.css']
})
export class MentorDeleteComponent implements OnInit {

  
  id: number = 0;
  mentor: Mentor = new Mentor();
  mentorImageSrc: string = '';

  constructor(private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router){
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.AuthService.getMentorByEmployeeId(this.id).subscribe(data => {
      console.log(data.data);
      this.mentor = data.data;

      // Update the value of the form control here
    this.registerForm.get('firstName')?.patchValue(this.mentor.firstName);
    this.registerForm.get('lastName')?.patchValue(this.mentor.lastName);
    this.registerForm.get('email')?.patchValue(this.mentor.email);
    this.registerForm.get('employeeId')?.patchValue(this.mentor.employeeId);
    this.registerForm.get('location')?.patchValue(this.mentor.location);
    this.registerForm.get('jobTitle')?.patchValue(this.mentor.jobTitle);
    this.registerForm.get('company')?.patchValue(this.mentor.company);
    this.registerForm.get('bio')?.patchValue(this.mentor.bio);
    this.registerForm.get('category')?.patchValue(this.mentor.category.category);
    this.registerForm.get('skills')?.patchValue(this.mentor.skills.toString());

    // Set the image source
    this.mentorImageSrc = this.convertByteArrayToDataUrl(this.mentor.profileImage);
    // this.mentorImageSrc = this.convertByteArrayToDataUrl(this.mentor.profileImage);
    
      console.log(this.mentor);
      console.log(this.mentor.firstName);
    })
  }

  registerForm = new FormGroup({
    image: new FormControl(null),
    firstName: new FormControl(this.mentor.firstName, [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    employeeId: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")]),
    location: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    skills: new FormControl('')
  });

  convertByteArrayToDataUrl(byteArray: number[]): string {
    // Check if the byteArray is empty or null to terminate the recursion
    if (!byteArray || byteArray.length === 0) {
      return '';
    }
  
    const base64String = btoa(String.fromCharCode(...byteArray));
    return `data:image/jpeg;base64,${base64String}`;
  }

  // deleteMentor(){
  //   this.AuthService.deleteMentorByEmployeeId(this.mentor.employeeId).subscribe(data =>{
      
  //     console.log(data);
  //   },
  //   error => {console.log(error);
  //   alert(error.error.message);}
  //   )
  // }
  deleteMentor() {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this mentor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with mentor deletion
        this.AuthService.deleteMentorByEmployeeId(this.mentor.employeeId).subscribe(
          (data) => {
            console.log(data);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            // You can also show a success message here if needed
          },
          (error) => {
            console.log(error);
            alert(error.error.message);
          }
        );
      }
    });
  }

  viewMentor(){
    this.router.navigate(['mentor-view', this.mentor.employeeId])
  }


  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
       return this.registerForm.get('lastName') as FormControl;
  }

  get employeeId(): FormControl {
    return this.registerForm.get('employeeId') as FormControl;
  }

  get email(): FormControl {
      return this.registerForm.get('email') as FormControl;
  }


  get location(): FormControl {
    return this.registerForm.get('location') as FormControl;
  }

  get company(): FormControl {
    return this.registerForm.get('company') as FormControl;
  }

  get jobTitle(): FormControl {
    return this.registerForm.get('jobTitle') as FormControl;
  }

  get bio(): FormControl {
    return this.registerForm.get('bio') as FormControl;
  }

  get Category(): FormControl{
    return this.registerForm.get('category') as FormControl;
  }

  get skills(): FormControl{
    return this.registerForm.get('skills') as FormControl;
  }


}
