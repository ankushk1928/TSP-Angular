import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, ViewChild, HostListener  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { MentorService } from '../search-by-skills/mentor.service';

@Component({
  selector: 'app-list-of-mentor',
  templateUrl: './list-of-mentor.component.html',
  styleUrls: ['./list-of-mentor.component.css'],
})

export class ListOfMentorComponent {

  showFooter = false;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  categoryForm!: FormGroup;
  categories: string[] = [];
  skills: string[] = [];
  skillsMenu: any;
  mentors: any[] = [];
  selectedSkills: string[] = [];
  selectedSkillsNotEmpty: boolean | undefined;
  

  constructor(
    private fb: FormBuilder, 
    private sharedMentorService: MentorService,
    private AuthService:AuthService,
    private router:Router
    ) 
    {}


    @HostListener('window:scroll', ['$event'])
    onScroll() {
      const contentHeight = document.body.scrollHeight;
      console.log(contentHeight);
      const scrollPosition = window.scrollY + window.innerHeight;
      console.log(scrollPosition);
      const threshold = 100; // Adjust this threshold as needed
    
      this.showFooter = scrollPosition >= contentHeight - threshold;
    }

ngOnInit() {
    const mentorsData = localStorage.getItem('mentorsData');
    if (mentorsData) {
      this.mentors = JSON.parse(mentorsData);
    }
    console.log(this.mentors);
    this.sharedMentorService.mentors$.subscribe((response: any) => {
      if (response && response.data && response.data.listOfMentors) {
        this.mentors = response.data.listOfMentors;

          // Save mentors data to localStorage
        localStorage.setItem('mentorsData', JSON.stringify(this.mentors));
        console.log('Mentors:', this.mentors);
      } 
      else if (response.error) {
        console.error('Error:', response.error);
        this.error();
      }
    });
  }
  error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No Mentor found with this skill!',
    })
  }
  fetchCategories() {
    this.AuthService.getAllCategories().subscribe(
      (response: any) => {
        if (response.status === 200) {
          // Extract 'category' property from the 'data' array in the response
          const responseData = response.data || [];
          this.categories = responseData.map((category: any) => category.category);
        } else {
          console.error('Error:', response.message);
          // Handle the error here, if necessary
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  }
  
  fetchSkills() {
    this.AuthService.getAllSkills().subscribe(
      (response: any) => {
        if (response.status === 200) {
          const responseData = response.data || [];
          this.skills = responseData.map((skill: any) => skill.skill);
        } else {
          console.error('Error:', response.message);
          // Handle the error here, if necessary
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  }

  onSkillsItemClick() {
    console.log("onsikllsitem called"); 
    
     // Check if there are any selected skills
    this.selectedSkillsNotEmpty = this.selectedSkills.length > 0;

    this.AuthService.getMentorsListBySkill(this.selectedSkills).subscribe(
      (response: any) => {
        if (response && response.data) {
          console.log(response);
          this.mentors = response.data.listOfMentors; // Assuming the mentors are in the 'data' property
          localStorage.setItem('mentorsData', JSON.stringify(this.mentors));
          console.log('Mentors:', this.mentors);
        } else {
          console.error('Error:', response.message);
          // Handle the error here, if necessary
        }
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  }
  
  resetFilters() {
    this.selectedSkills = [];
    // Call the function to update the mentor list based on the cleared filters
    this.onSkillsItemClick();
  }

  swal()
  {

  }
  navigateToSearchBySkill() {
   
    this.router.navigate(['/searchBySkills']); 
  }



}
