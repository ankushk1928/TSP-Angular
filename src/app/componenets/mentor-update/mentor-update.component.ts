import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/mentor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mentor-update',
  templateUrl: './mentor-update.component.html',
  styleUrls: ['./mentor-update.component.css']
})
export class MentorUpdateComponent implements OnInit {

  id: number = 0;
  mentor: Mentor = new Mentor();
  mentorImageSrc: string = '';

  allSkills: any[] = [];
  selectedSkills: any[] = [];
  dropdownSettings : IDropdownSettings = {};
  allCategories: any[] = []; 

  constructor(private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router){
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchSkills();
    this.fetchCategories();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'skill',
      textField: 'skill',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    this.AuthService.getMentorByEmployeeId(this.id).subscribe(data => {
      console.log("mentor data ="+data);

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
    this.registerForm.get(('password'))?.patchValue(this.mentor.password);
    this.mentor.skills.forEach(skill=> this.selectedSkills.push(skill));

    console.log("selected skills ", this.selectedSkills)
    console.log("passwords",this.mentor.password)

    this.registerForm.get('skills')?.patchValue(this.selectedSkills);
   // this.mentor.skills.forEach(skill =>this.selectedSkills.push(skill));



    // Set the image source
    this.mentorImageSrc = this.convertByteArrayToDataUrl(this.mentor.profileImage);
    // this.mentorImageSrc = this.convertByteArrayToDataUrl(this.mentor.profileImage);
      console.log(this.mentor);
    })
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
    this.AuthService.getAllCategories().subscribe(
      (data: any) => {
        this.allCategories = data.data;
        console.log(this.allCategories); // Log the fetched data
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
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
    password:new FormControl('', [Validators.required]),
    skills: new FormControl()
  });

  convertByteArrayToDataUrl(byteArray: number[]): string {
    // Check if the byteArray is empty or null to terminate the recursion
    if (!byteArray || byteArray.length === 0) {
      return '';
    }
  
    const base64String = btoa(String.fromCharCode(...byteArray));
    return `data:image/jpeg;base64,${base64String}`;
  }


  updateMentorDetails() {
    if (this.registerForm.valid) {

      this.mentor.firstName = this.registerForm.get('firstName')?.value || '';
      this.mentor.lastName = this.registerForm.get('lastName')?.value || '';
      this.mentor.email = this.registerForm.get('email')?.value || '';
      this.mentor.employeeId = this.registerForm.get('employeeId')?.value || 0;
      this.mentor.jobTitle = this.registerForm.get('jobTitle')?.value || '';
      this.mentor.company = this.registerForm.get('company')?.value || '';
      this.mentor.location= this.registerForm.get('location')?.value || '';
      this.mentor.bio = this.registerForm.get('bio')?.value || '';
      this.mentor.skills=this.selectedSkills

      
      console.log("password2"+this.mentor.password);
      console.log("skill"+this.mentor.skills)
      this.updateMentor(this.mentor);
      Swal.fire({
        icon: 'success',
        title: 'Successful Updated',
        text: ' Your details have been updated successfully',
      });
     
  
    } else {

      console.log("Error Occured+");
      
    }
  }

  updateMentor(mentor:Mentor){
    this.AuthService.updateMentor(mentor.employeeId,mentor).subscribe(data =>{
      console.log(data);
    },error=>{
      console.log(error)
    }
    )
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
