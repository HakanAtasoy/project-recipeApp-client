import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { AuthService } from './auth.service';
import { recipePage } from '../recipe/recipePage.model';
import { favoritePage } from '../favorite/favoritePage.model';
import { RecipeDetail } from '../recipe-details/recipe-detail.model';



@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080'; // Update with your API endpoint

  constructor(private authService: AuthService, private http: HttpClient) {}

  getMainPageRecipes(): Observable<Recipe[]> {
    this.authService.checkToken();
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/main`);
  }

  getRecipesByCategoryIdAndQuery(query: string | null, categoryId: number | null, page: number): Observable<recipePage> {
    this.authService.checkToken();
    return this.http.get<recipePage>(`${this.apiUrl}/recipes/query?searchQuery=${query}&page=${page}&categoryId=${categoryId}`);
  }

  getUserRecipes(page:number): Observable<recipePage> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      // If a token is available in the user object, use it for authentication
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });

      return this.http.get<recipePage>(`${this.apiUrl}/recipes?page=${page}`, { headers });
    } else {
    // Handle the case where there is no token (e.g., user not logged in)
    throw new Error('Unauthorized'); // You can throw an error or handle it as needed
  }
  }

  
  getFavoriteRecipes(page:number): Observable<favoritePage> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      // If a token is available in the user object, use it for authentication
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });

      return this.http.get<favoritePage>(`${this.apiUrl}/favorites?page=${page}`, { headers });
    } else {
    // Handle the case where there is no token (e.g., user not logged in)
    throw new Error('Unauthorized'); // You can throw an error or handle it as needed
  }
  }

  addRecipe(recipeModel: Recipe, file: File): Observable<any> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      // If a token is available in the user object, use it for authentication
      const formData = new FormData();

      recipeModel.userId = user.userModel.id;
      const recipeModelJson = JSON.stringify(recipeModel);
      // Append recipeModel as a part
      formData.append('recipeModel', recipeModelJson);
      formData.append('imageFile', file);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });
  
      return this.http.post(`${this.apiUrl}/recipes`, formData, { headers });
    } else {
      // Handle the case where there is no token (e.g., user not logged in)
      throw new Error('Unauthorize'); // You can throw an error or handle it as needed
    }
  }

  editRecipe(recipeModel: Recipe, file: File): Observable<any> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      // If a token is available in the user object, use it for authentication
      const formData = new FormData();

      recipeModel.userId = user.userModel.id;
      const recipeModelJson = JSON.stringify(recipeModel);
      // Append recipeModel as a part
      formData.append('recipeModel', recipeModelJson);
      formData.append('imageFile', file);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });
  
      return this.http.put(`${this.apiUrl}/recipes`, formData, { headers });
    } else {
      // Handle the case where there is no token (e.g., user not logged in)
      throw new Error('Unauthorize'); // You can throw an error or handle it as needed
    }
  }

  getRecipeById(recipeId: number): Observable<Recipe> {
    this.authService.checkToken();  
    const user = this.authService.getUserInfo();
    let headers = new HttpHeaders();
    if (user && user.token) {
      headers = headers.set('Authorization', `Bearer ${user.token}`);
    }
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, {headers});
  }


  deleteRecipe(recipeId : number): Observable<boolean> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      // If a token is available in the user object, use it for authentication
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });

      return this.http.delete<boolean>(`${this.apiUrl}/recipes/${recipeId}`, { headers });
    } else {
      // Handle the case where there is no token (e.g., user not logged in)
      throw new Error('Unauthorized'); // You can throw an error or handle it as needed
    }
  }

  deleteFavorite(favoriteId: number): Observable<boolean> {
    this.authService.checkToken();
    const user = this.authService.getUserInfo();
    if (user && user.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      });
      
      return this.http.delete<boolean>(`${this.apiUrl}/favorites/remove/${favoriteId}`, { headers });
    } else {
      throw new Error('Unauthorized');
    }
  }
  
}
