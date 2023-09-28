import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './componenets/register-mentee/register-mentee.component';
import { LoginMenteeComponent } from './componenets/login-mentee/login-mentee.component';
import { SearchBySkillsComponent } from './componenets/search-by-skills/search-by-skills.component';
import { RegisterMentorComponent } from './componenets/register-mentor/register-mentor.component';
import { ListOfMentorComponent } from './componenets/list-of-mentor/list-of-mentor.component';
import { MentorViewComponent } from './componenets/mentor-view/mentor-view.component';
import { MentorUpdateComponent } from './componenets/mentor-update/mentor-update.component';
import { MentorDeleteComponent } from './componenets/mentor-delete/mentor-delete.component';
import { HomeComponent } from './componenets/home/home.component';
import { MenteeGuard } from './guard/mentee.guard';
import { MenteeLoginGuard } from './guard/mentee-login.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
path:'home',
component:HomeComponent,
  },
  {
    path: 'menteeRegister',
    component: RegisterComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginMenteeComponent,
    pathMatch:'full',
    canActivate:[MenteeLoginGuard]
  },
  {
    path: 'searchBySkills',
    component:SearchBySkillsComponent,
    pathMatch:'full',
    canActivate:[MenteeGuard]
  },
  {
    path: 'mentorRegister',
    component:RegisterMentorComponent,
    pathMatch:'full'
  },
 
  {
    path: 'mentor/browse',
    component: ListOfMentorComponent,
    canActivate:[MenteeGuard]
  },{
    path:'mentor-view/:id',
   component: MentorViewComponent,
   canActivate:[MenteeGuard]
  },
  {
    path:'mentor-update/:id',
     component: MentorUpdateComponent,
     canActivate:[MenteeGuard]
  },
  {
    path:'mentor-delete/:id', 
    component: MentorDeleteComponent,
    canActivate:[MenteeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
