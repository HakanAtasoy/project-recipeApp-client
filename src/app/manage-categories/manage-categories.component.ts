import { Component, ElementRef, ViewChild } from '@angular/core';
import { Category } from '../category/category.model';
import { categoryPage } from '../category/categoryPage.model';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {
  constructor(
    private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
    private categoryService: CategoryService,
    private router: Router, // Inject the Router service
    private paginationService: PaginationService,
  ) 
  {
    this.activatedRoute.queryParams.subscribe((params) => {
      
      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 1;
      this.getAllCategories(1);
    })
  }

  categories: Category[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  pageSize = 12;
  @ViewChild('paginationContainer') paginationContainer!: ElementRef;

  getAllCategories(page: number): void {
    
    this.categoryService.getAllCategories(page, 12)
      .subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
  }

  private handleResponse(response: categoryPage): void {
    this.categories = response.content;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
    this.totalItems = response.totalItems;
    this.pageSize = response.pageSize;
  }

  private handleError(error: any): void {
    console.error('Error searching categories:', error);
    // You can add error handling logic here, e.g., displaying an error message.
  }

  confirmDelete(category: Category) {
    const confirmMessage = `${category.name} adlı tarifi silmek istediğinizden emin misiniz ?`;
  
    if (confirm(confirmMessage)) {
      // Call the deletecategory function from your service
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (response: boolean) => this.handleDeleteSuccess(category, response),
        error: (error) => this.handleDeleteError(error)
      });
    }
  }

  private handleDeleteSuccess(category: Category, success: boolean) {
    // Recipe deleted successfully from the server, now remove it from the local array
    
    if(success) {
      const index = this.categories.indexOf(category);
      if (index !== -1) {
        this.categories.splice(index, 1);
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

  navigateToRecipes(categoryId: number): void {
    // Navigate to the recipes page with the category ID as a query parameter
    this.router.navigate(['/recipes'], {
      queryParams: { 'categoryId': categoryId, 'page': 1 },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      //this.getPageUrl();
      this.getAllCategories(page);
      this.scrollToTop();
    }
  }

  navigateTocategorys(categoryId: number): void {
    // Navigate to the categorys page with the category ID as a query parameter
    this.router.navigate(['/categorys'], {
      queryParams: { 'categoryId': categoryId, 'page': 1 },
    });
  }

  getPagesArray(): number[] {
    return this.paginationService.getPagesArray(this.currentPage, this.totalPages);
  }

  scrollToTop(): void {
    this.paginationService.scrollToTop(this.paginationContainer);
  }
}
