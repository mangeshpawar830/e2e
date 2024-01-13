import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../manager-dashboard/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; 
  private userData: any;
  private userData1: User | null = null;
 

  constructor(private http: HttpClient) {}


 login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, loginRequest);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/all`);
  }

  getUserId1(): number | null {
    const authenticatedUser = this.userData;
    
    return authenticatedUser ? authenticatedUser.id : null;
  }
  

getUserId(): number | null {
  return this.userData ? this.userData.id : null;
}
  setUserData(user: any): void {
    this.userData = user;
  }

  getAuthenticatedUser(): any {
    return this.userData;
  }

}
