import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupResponse } from '../signup/signup-response.model';
import { LoginResponse } from '../login/login-response.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
    console.log(this.loggedIn);
  }

  private apiUrl = 'http://localhost:8080';

  login(userName: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/signin`, { userName, password }).pipe(
      tap((response) => {
        if (response.token) {
          // Store the entire response object in session storage
          sessionStorage.setItem('authResponse', JSON.stringify(response));
          sessionStorage.setItem('username', userName);
          sessionStorage.setItem('role', response.userModel.role);
          console.log("authResponse")
          this.loggedIn.next(true);
          this.router.navigate(['/']).then(() => {
            // Reload the page to refresh it
            window.location.reload();
          });

        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          // Unauthorized, token is not valid, log out the user
          this.logout();
        }
        throw error;
      })
    );
  }

  logout() {
    // Remove the token and update the logged-in status from session storage
    sessionStorage.removeItem('authResponse');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.loggedIn.value;
  }

  public checkToken() {
    const authResponse = sessionStorage.getItem('authResponse');
    if (authResponse) {
      const response = JSON.parse(authResponse);
      if (response.token) {
        this.isTokenValid(response.token).subscribe({
          next: (valid) => {
            if (!valid) {
              this.logout();
            }
            else{
              this.loggedIn.next(true);
            }
          },
          error: (err) => {
            console.error('Error in token validation:', err);
            this.logout();
          }
        });
      }
    }
  }


  
  private isTokenValid(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/is-token-valid`, token, {
      headers: { 'Content-Type': 'text/plain' }, // Set the content type to plain text
    });
  }
  

  signup(userName: string, firstName: string, lastName: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/auth/signup`, { userName, firstName, lastName, password });
  }


  getUserInfo(): { userModel: any, token: string } | null {
    const authResponse = sessionStorage.getItem('authResponse');
    if (authResponse) {
      const response = JSON.parse(authResponse);
      return {
        userModel: response.userModel,
        token: response.token
      };
    }
    return null; // If no user information is found in session storage
  }
  
}
