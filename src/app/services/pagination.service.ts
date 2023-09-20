import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupResponse } from '../signup/signup-response.model';
import { LoginResponse } from '../login/login-response.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {


  constructor(){}

  getPagesArray(currentPage: number, totalPages: number): number[] {
    const maxPagesToShow = 5; // Adjust this value based on how many page links you want to display
    const pagesArray: number[] = [];
  
    // Calculate the starting and ending page numbers
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  
    // Adjust the startPage if the endPage is at the maximum limit
    if (endPage === totalPages) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }
  
    // Create the array of page numbers
    for (let page = startPage; page <= endPage; page++) {
      pagesArray.push(page);
    }
  
    return pagesArray;
  }

  scrollToTop(paginationContainer: ElementRef): void {
    if (paginationContainer && paginationContainer.nativeElement) {
      paginationContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}