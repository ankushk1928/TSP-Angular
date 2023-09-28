import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './componenets/register-mentee/register-mentee.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ForbiddenNameValidatorDirective } from './componenets/register-mentee/forbidden-name.directive';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoginMenteeComponent } from './componenets/login-mentee/login-mentee.component';
import { SearchBySkillsComponent } from './componenets/search-by-skills/search-by-skills.component';
import { RegisterMentorComponent } from './componenets/register-mentor/register-mentor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListOfMentorComponent } from './componenets/list-of-mentor/list-of-mentor.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MentorViewComponent } from './componenets/mentor-view/mentor-view.component';
import { MentorUpdateComponent } from './componenets/mentor-update/mentor-update.component';
import { MentorDeleteComponent } from './componenets/mentor-delete/mentor-delete.component';
import { HomeComponent } from './componenets/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
    ForbiddenNameValidatorDirective,
    LoginMenteeComponent,
    SearchBySkillsComponent,
    RegisterMentorComponent,
    ListOfMentorComponent,
    MentorViewComponent,
    MentorUpdateComponent,
    MentorDeleteComponent,
    HomeComponent,
  
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    BrowserAnimationsModule

  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
