import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaginationService } from '../services/pagination.service';
import { favoritePage } from './favoritePage.model';
import { Favorite } from './favorite.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  favorites: Favorite[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  pageSize = 12;

  @ViewChild('paginationContainer') paginationContainer!: ElementRef;
  @ViewChild('confirmationModal') confirmationModal: any;


  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
    private location: Location, // Inject the Location service
    private paginationService: PaginationService,

  ) {
    // Subscribe to query parameter changes
    this.activatedRoute.queryParams.subscribe((params) => {
      // Log the parameters for debugging
      console.log('queryParams:', params);

      // Check if 'page' parameter exists and set the current page accordingly
      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 1;

      // Call the search method with the updated search query and page number
      this.getFavoriteRecipes(this.currentPage);
    });
  }

  getFavoriteRecipes(page: number): void {
    // Store the current search query and user ID
    // Call the getRecipesByuserIdAndQuery function with both parameters
    this.recipeService.getFavoriteRecipes(page
    ).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

    this.getPageUrl();
  }
  

  private handleResponse(response: favoritePage): void {
    this.favorites = response.content;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
    this.totalItems = response.totalItems;
    this.pageSize = response.pageSize;
  }

  private handleError(error: any): void {
    console.error('Error searching recipes:', error);
    // You can add error handling logic here, e.g., displaying an error message.
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      //this.getPageUrl();
      this.getFavoriteRecipes(this.currentPage);
      this.scrollToTop();
    }

    this.getPageUrl();

  }
  
  getPageUrl(): void {
    // Define the route path for your search results page
    const routePath = '/my-favorites';
  
    // Define any query parameters you want to include in the URL
    const queryParams = {
      page: this.currentPage.toString(), // Convert page number to string
      // user: this.userId.toString(), 
      // Add other query parameters as needed
    };
  
    // Use Angular's Location service to change the URL
    this.location.go(routePath, this.router.createUrlTree([routePath], { queryParams }).toString());
  }


  confirmDelete(favorite: Favorite) {
    const confirmMessage = `${favorite.recipeModel.name} adlı tarifi favorilerinizden çıkarmak istediğinize emin misiniz ??`;
  
    if (confirm(confirmMessage)) {
      // Call the deleteFavorite function from your service
      console.log("favorite.id:");
      console.log(favorite.id);
      console.log("favorite:");
      console.log(favorite);
      this.recipeService.deleteFavorite(favorite.id).subscribe({
        next: (response: boolean) => this.handleDeleteSuccess(favorite, response),
        error: (error) => this.handleDeleteError(error)
      });
    }
  }
  


  private handleDeleteSuccess(favorite: Favorite, success: boolean) {
    // Call the deleteFavorite function from your service

      // Find the index of the favorite to remove in the 'favorites' array
      if(success) {
        const index = this.favorites.findIndex((f) => f.id === favorite.id);
        console.log("this.favéorites: 1");
        console.log(this.favorites);

        // If the index is found, remove the favorite from the array
        if (index !== -1) {
          this.favorites.splice(index, 1);
        }

        console.log(this.favorites);
      }
      else {
        console.error('Error deleting favorite:');
      }

  }
  
  

  private handleDeleteError(error: any) {
      // Handle error
      console.error('Error deleting recipe:', error);
  }

  getPagesArray(): number[] {
    return this.paginationService.getPagesArray(this.currentPage, this.totalPages);
  }

  scrollToTop(): void {
    this.paginationService.scrollToTop(this.paginationContainer);
  }


}
