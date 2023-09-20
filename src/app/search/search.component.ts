import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { recipePage } from '../recipe/recipePage.model';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Location } from '@angular/common';
import { PaginationService } from '../services/pagination.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searched = false;
  searchQueryValue = '';
  recipes: Recipe[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  pageSize = 12;
  categoryId = 0; // Initialize as null
  private previousQueryParams: any = {}; // Initialize with an empty object

  @ViewChild('paginationContainer') paginationContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
    private location: Location, // Inject the Location service
    private paginationService: PaginationService
  ) {
    // Subscribe to query parameter changes
    this.activatedRoute.queryParams.subscribe((params) => {
      // Log the parameters for debugging
      console.log('queryParams:', params);
  
      // Check if 'searchQuery' parameter exists and set the current search query accordingly
      this.searchQueryValue = params['searchQuery'] || '';

      this.categoryId = params['categoryId'] ? parseInt(params['categoryId'], 10) : 0;

      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 1;
  
      this.performSearch(this.searchQueryValue, this.categoryId, this.currentPage);


    });
  }

  performSearch(searchQuery: string | null, categoryId: number , page: number): void {
    // Store the current search query and category ID
    this.searchQueryValue = searchQuery || '';
    this.categoryId = categoryId;

    // Call the getRecipesByCategoryIdAndQuery function with both parameters
    this.recipeService.getRecipesByCategoryIdAndQuery(
      this.searchQueryValue,
      this.categoryId,
      page,
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
    this.searched = true;
  }

  private handleError(error: any): void {
    console.error('Error searching recipes:', error);
    // You can add error handling logic here, e.g., displaying an error message.
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      //this.getPageUrl();
      this.performSearch(this.searchQueryValue, this.categoryId, page);
      this.scrollToTop();
    }

    this.getPageUrl();

  }
  
  getPageUrl(): void {
    // Define the route path for your search results page
    const routePath = '/recipes';
  
    // Define any query parameters you want to include in the URL
    const queryParams = {
      searchQuery: this.searchQueryValue,
      page: this.currentPage.toString(), // Convert page number to string
      category: this.categoryId.toString(), 
      // Add other query parameters as needed
    };
  
    // Use Angular's Location service to change the URL
    this.location.go(routePath, this.router.createUrlTree([routePath], { queryParams }).toString());
  }

  getPagesArray(): number[] {
    return this.paginationService.getPagesArray(this.currentPage, this.totalPages);
  }

  scrollToTop(): void {
    this.paginationService.scrollToTop(this.paginationContainer);
  }
}
