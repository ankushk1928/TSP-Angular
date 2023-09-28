import { Mentor } from 'src/app/mentor';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MentorService } from './mentor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-search-by-skills',
  templateUrl: './search-by-skills.component.html',
  styleUrls: ['./search-by-skills.component.css']
})
export class SearchBySkillsComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private mentorService: TalentSharePortalMentorService,
    private router: Router,
    private sharedMentorService: MentorService,
    private authService : AuthService 
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchSkills: ['']// No validation applied to searchSkills
    });
  }

  onSubmit() {
    const searchSkills = this.searchForm.get('searchSkills')?.value as string;
    const skillsArray = searchSkills.split(',').filter(skill => skill.trim() !== '');
    console.log(skillsArray);
    
    this.authService.getMentorsListBySkill(skillsArray).subscribe(
      (result) => {
        console.log('Mentor list:', result);
        this.sharedMentorService.setMentors(result);
        this.router.navigate(['/mentor/browse']);
      },
      (error:HttpErrorResponse) => {
        console.error('Error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Mentor found with this skill!',
        })
        // this.router.navigate(['/mentor/browse']);
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
