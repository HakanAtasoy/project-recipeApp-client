import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { categoryPage } from '../category/categoryPage.model';
import { Category } from '../category/category.model';


@Injectable({
    providedIn: 'root',
  })
  export class CategoryService {

    constructor(private authService: AuthService, private http: HttpClient) {}

    private apiUrl = 'http://localhost:8080';

    getAllCategories(page: number, pageSize: number): Observable<categoryPage> {
      this.authService.checkToken();
      return this.http.get<categoryPage>(`${this.apiUrl}/categories?page=${page}&pageSize=${pageSize}`);
    }

    getCategoryById(categoryId: number): Observable<Category> {
      this.authService.checkToken();  
      const user = this.authService.getUserInfo();
      let headers = new HttpHeaders();
      if (user && user.token) {
        headers = headers.set('Authorization', `Bearer ${user.token}`);
      }
      return this.http.get<Category>(`${this.apiUrl}/categories/${categoryId}`, {headers});
    }

    addCategory(categoryModel: Category, file: File): Observable<any> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const formData = new FormData();
  
        const categoryModelJson = JSON.stringify(categoryModel);
        // Append categoryModel as a part
        formData.append('categoryModel', categoryModelJson);
        formData.append('imageFile', file);
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`
        });
    
        return this.http.post(`${this.apiUrl}/categories`, formData, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        throw new Error('Unauthorize'); // You can throw an error or handle it as needed
      }
    }

    editCategory(categoryModel: Category, file: File): Observable<any> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const formData = new FormData();
  
        const categoryModelJson = JSON.stringify(categoryModel);
        // Append categoryModel as a part
        formData.append('categoryModel', categoryModelJson);
        formData.append('imageFile', file);
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`
        });
    
        return this.http.put(`${this.apiUrl}/categories`, formData, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        throw new Error('Unauthorize'); // You can throw an error or handle it as needed
      }
    }

    deleteCategory(categoryId : number): Observable<boolean> {
      this.authService.checkToken();
      const user = this.authService.getUserInfo();
      if (user && user.token) {
        // If a token is available in the user object, use it for authentication
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${user.token}`
        });
  
        return this.http.delete<boolean>(`${this.apiUrl}/categories/${categoryId}`, { headers });
      } else {
        // Handle the case where there is no token (e.g., user not logged in)
        throw new Error('Unauthorized'); // You can throw an error or handle it as needed
      }
    }
  }
