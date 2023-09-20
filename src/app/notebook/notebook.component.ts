import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { recipePage } from '../recipe/recipePage.model';
import { Location } from '@angular/common';
import { PaginationService } from '../services/pagination.service';



@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent {
  recipes: Recipe[] = [];
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
      this.getUserRecipes(this.currentPage);
    });
  }

  getUserRecipes(page: number): void {
    // Store the current search query and user ID
    // Call the getRecipesByuserIdAndQuery function with both parameters
    this.recipeService.getUserRecipes(page
    ).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

    this.getPageUrl();
  }
  

  private handleResponse(response: recipePage): void {
    this.recipes = response.content;
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
      this.getUserRecipes(this.currentPage);
      this.scrollToTop();
    }

    this.getPageUrl();

  }
  
  getPageUrl(): void {
    // Define the route path for your search results page
    const routePath = '/my-recipes';
  
    // Define any query parameters you want to include in the URL
    const queryParams = {
      page: this.currentPage.toString(), // Convert page number to string
      // user: this.userId.toString(), 
      // Add other query parameters as needed
    };
  
    // Use Angular's Location service to change the URL
    this.location.go(routePath, this.router.createUrlTree([routePath], { queryParams }).toString());
  }


  confirmDelete(recipe: Recipe) {
    const confirmMessage = `${recipe.name} adlı tarifi silmek istediğinizden emin misiniz ?`;
  
    if (confirm(confirmMessage)) {
      // Call the deleteRecipe function from your service
      this.recipeService.deleteRecipe(recipe.id).subscribe({
        next: (response: boolean) => this.handleDeleteSuccess(recipe, response),
        error: (error) => this.handleDeleteError(error)
      });
    }
  }
  

  private handleDeleteSuccess(recipe: Recipe, success: boolean) {
    // Recipe deleted successfully from the server, now remove it from the local array
    
    if(success) {
      const index = this.recipes.indexOf(recipe);
      if (index !== -1) {
        this.recipes.splice(index, 1);
      }
    }
    else {
      console.log("error deleting");
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
