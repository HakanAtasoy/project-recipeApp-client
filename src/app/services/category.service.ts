import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { categoryPage } from '../category/categoryPage.model';


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

  }
