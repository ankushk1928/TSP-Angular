import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category';
import { Mentor } from 'src/app/mentor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-register-mentor',
  templateUrl: './register-mentor.component.html',
  styleUrls: ['./register-mentor.component.css']
})
export class RegisterMentorComponent implements OnInit {
  mentor: Mentor = new Mentor();
  selectedImage: File | null = null; 
  category: Category= new Category();

  allSkills: any[] = [];
  selectedSkills: any[] = [];
  dropdownSettings : IDropdownSettings = {};

  allCategories: any[] = []; 

  
  constructor(private AuthService: AuthService,
    private router: Router){
    
  }
  ngOnInit(): void {
    this.fetchSkills();
    this.fetchCategories();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'skill',
      textField: 'skill',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 6,
    };

  }

  onSkillSelect(item: any){
    this.selectedSkills.push(item.skill);
    console.log(this.selectedSkills);
  }

  onSkillDeSelect(item: any){
    console.log(item);
    const indexToRemove = this.selectedSkills.indexOf(item.skill);
    this.selectedSkills.splice(indexToRemove, 1);
     console.log(this.selectedSkills);
  }

  onSelectAllSkills(skills: any){

    this.allSkills.forEach(sk => {
    this.selectedSkills.push(sk.skill)
    });  
    console.log(this.selectedSkills);    
  }

  onDeSelectAllSkills(item: any){
    this.selectedSkills = [];
    console.log(this.selectedSkills);
  }

  fetchSkills() {
    this.AuthService.getAllSkills().subscribe(
      (data: any) => {
        console.log(data.data)
        this.allSkills = data.data;
      },
      error => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  fetchCategories() {
    this.AuthService.getAllCategorie().subscribe(
      (data: any) => {
        this.allCategories = data.data;
        console.log(this.allCategories); // Log the fetched data
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  

  onImageSelected(event: any) {
    const file = event.target.files[0] as File;
    this.selectedImage = file;

    // You can perform additional actions here, such as previewing the image if needed.
  }

  registerForm = new FormGroup({
    image: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    employeeId: new FormControl(0 , [Validators.required, Validators.pattern("[0-9]*")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    location: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    skills: new FormControl([])
  });

  registerMentor() {
    if (this.registerForm.valid) 
    {

      if (this.selectedImage) {
        this.imageToByteArray(this.selectedImage)
          .then(byteArray => {
            this.mentor.profileImage = [...byteArray];
            console.log('Image converted to byte array:', this.mentor.profileImage);
            this.saveMentorWithImage();
            
            // Now, your mentor object includes the image as a byte array
          })
          .catch(error => {
            console.error('Error converting image to byte array:', error);
          });
      }else {
        // Handle the case where no image is selected
        console.error('No image selected');
        // Optionally, show an error message to the user
      }
    } else {
      console.error('Form is invalid');
      // Handle the case where the form is invalid (e.g., show validation errors)
    }
  }
      

  saveMentorWithImage() {
      this.mentor.firstName = this.registerForm.get('firstName')?.value || '';
      this.mentor.lastName = this.registerForm.get('lastName')?.value || '';
      this.mentor.email = this.registerForm.get('email')?.value || '';
      this.mentor.password = this.registerForm.get('password')?.value || '';
      this.mentor.employeeId = this.registerForm.get('employeeId')?.value || 0;
      this.mentor.jobTitle = this.registerForm.get('jobTitle')?.value || '';
      this.mentor.company = this.registerForm.get('company')?.value || '';
      this.mentor.location= this.registerForm.get('location')?.value || '';
      this.mentor.bio = this.registerForm.get('bio')?.value || '';
      this.category.category = this.registerForm.get('category')?.value || ''; 
      this.category.categoryId=1;
      this.mentor.category = this.category;
      const selectedSkills = this.registerForm.get('skills')?.value;
      //this.mentor.skills = Array.isArray(selectedSkills) ? selectedSkills : [];
      this.mentor.skills = this.selectedSkills;

      this.addMentor(this.mentor);
      console.log(this.mentor);
    } 

  addMentor(mentor:Mentor){
    this.AuthService.registerMentor(this.mentor).subscribe(data=>{
      console.log(data);
    
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now sign in with your credentials.',
      });
      this.viewMentor();
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
  }
  viewMentor(){
    this.router.navigate([`login`])
  }

  imageToByteArray(image: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };

      reader.onerror = (event: any) => {
        reject(event.target.error);
      };

      reader.readAsArrayBuffer(image);
    });
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

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
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
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  navigateToRegisterMentee()
  {
    this.router.navigate(['/menteeRegister']); 
  }

  navigateToSearch()
  {
    this.router.navigate(['/searchBySkills']);
  }

}
