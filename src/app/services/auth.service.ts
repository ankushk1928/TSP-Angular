import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mentor } from '../mentor';
import { Skill } from '../skill';
import { Category } from '../category';


interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
  data?: any;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  // private baseURL='http://localhost:8080/api/v1'
  private MenteebaseURL=environment.menteebaseUrl
  private MentorbaseURL=environment.mentorbaseUrl
  private skillUrl = "http://localhost:8080/api/v1/skill/get-all-skills";
  private categoriesUrl = "http://localhost:8080/api/v1/category/get-all-categories";


  constructor(private http: HttpClient) { }

  registerMentee(formData: any) {
    return this.http.post<ApiResponse>(`${this.MenteebaseURL}/api/v1/mentee/register`, formData);
  }

  LoginMentee(email:string,password:string) {
    const params=new HttpParams()
    .set('email', email)
    .set('password', password);
    console.log(params);
    return this.http.get(`${this.MenteebaseURL}/api/v1/mentee/login`,{params});
  }


  LoginMentor(email:string,password:string) {
    const params=new HttpParams()
    .set('email', email)
    .set('password', password);
    console.log(params);
    return this.http.get(`${this.MentorbaseURL}/api/v1/mentor/login`,{params});
  }
  
  registerMentor(mentor:Mentor): Observable<Object>{
    return this.http.post<ApiResponse>(`${this.MentorbaseURL}/api/v1/mentor/register`, mentor);
  }
 
  getAllSkills(): Observable<Skill> {
    const url = `${this.MentorbaseURL}/api/v1/skill/get-all-skills`;
    return this.http.get<Skill>(url);
  }

  getMentorsListBySkill(skills: string[]): Observable<any> {
    console.log("getMentorsListBySkill method called..!")
    const additionalPath = "/api/v1/mentor/search";
    const url = `${this.MentorbaseURL}${additionalPath}`;
    const params = new HttpParams().set('skills', skills.join(','));
    return this.http.get<any>(url, { params });
}

  getAllCategorie(): Observable<any> {
    return this.http.get(`${this.MentorbaseURL}/api/v1/category/get-all-categories`);
  }

  deleteMentorByEmployeeId(id:number): Observable<any> {
    return this.http.delete(`${this.MentorbaseURL}/api/v1/mentor/delete/${id}`)
  }

  getAllCategories(): Observable<Category> {
    const url = `${this.MentorbaseURL}/api/v1/category/get-all-categories`;
    return this.http.get<Category>(url);
  }

  getMentorByEmployeeId(id:number): Observable<any> {
    console.log("viewmentee called auth")
    return this.http.get(`${this.MentorbaseURL}/api/v1/mentor/get/${id}`)
    
  }

  updateMentor(id:Number, mentor:Mentor): Observable<any> {
    return this.http.put(`${this.MentorbaseURL}/api/v1/mentor/update/${id}`, mentor);
  }
  
}
