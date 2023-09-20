import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { RecipeDetail } from '../recipe-details/recipe-detail.model';
import { Review } from '../review/review.model';


@Injectable({
    providedIn: 'root',
  })
  export class RecipeDetailsService {
    private apiUrl = 'http://localhost:8080'; // Update with your API endpoint
  
    constructor(private authService: AuthService, private http: HttpClient) {}


    getRecipeDetails(recipeId: number): Observable<RecipeDetail> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      let headers = new HttpHeaders();
      if (user && user.token) {
        headers = headers.set('Authorization', `Bearer ${user.token}`);
      }
      return this.http.get<RecipeDetail>(`${this.apiUrl}/recipes/details/${recipeId}`, {headers});
    }

    likeRecipe(recipeId: number): Observable<void | 'guest'> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`
        });
    
        // Create a FormData object to send the recipeId as a POST parameter
        const formData = new FormData();
        formData.append('recipeId', recipeId.toString());
    
        return this.http.post<void>(`${this.apiUrl}/favorites`, formData, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        return of('guest');
      }
    }
      
      

    unlikeRecipe(recipeId: number): Observable<boolean> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`
        });
  
        return this.http.delete<boolean>(`${this.apiUrl}/favorites/${recipeId}`, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        throw new Error('Unauthorized'); // You can throw an error or handle it as needed
      }
    }

    addComment(recipeId: number, newComment: string): Observable<Review | 'guest'> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`,
        });

        const formData = new FormData();
        formData.append('recipeId', recipeId.toString());
        formData.append('description', newComment);
  
        return this.http.post<Review>(`${this.apiUrl}/reviews`, formData, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        return of('guest');
      }
    }

    formatTimeDifference(date: Date | null): string {
      if (!date) {
        return 'N/A'; // Handle the case where date is null
      }
      
      const now = new Date();
  
      const timeDifference = now.getTime() - date.getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30); // Approximate
      const years = Math.floor(months / 12); // Approximate
  
      if (years > 0) {
        return years === 1 ? '1 yıl önce' : `${years} yıl önce`;
      } else if (months > 0) {
        return months === 1 ? '1 ay önce' : `${months} ay önce`;
      } else if (days > 0) {
        return days === 1 ? '1 gün önce' : `${days} gün önce`;
      } else if (hours > 0) {
        return hours === 1 ? '1 saat önce' : `${hours} saat önce`;
      } else if (minutes > 0) {
        return minutes === 1 ? '1 dakika önce' : `${minutes} dakika önce`;
      } else {
        return seconds === 1 ? '1 saniye önce' : `${seconds} saniye önce`;
      }
    }
      
}
  
