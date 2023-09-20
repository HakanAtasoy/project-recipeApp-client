import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category.model';
import { categoryPage } from '../category/categoryPage.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit {

  file!: File;
  imageUrl: string | null = null;
  existingImageUrl: string | null = null;
  categorySearch: String = ''; // To store the user's search input
  categories: Category[] = [];
  filteredCategories: Category[] = [];  // Change to Category array
  isEdit: boolean = false;
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    createDate: null,
    updateDate: null,
    deleteDate: null,
    categoryId: 0,
    categoryName: '',
    userId: 0,
    userName: '',
    deleted: false,
    status: 0,
    imageData: null,
    preparationTime: '',
    servingSize: '',
  };

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    ) {}

    ngOnInit() {

      this.getAllCategories(1);

      const recipeId = this.route.snapshot.params['recipeId']; // Assuming you pass recipe ID through route
      if (recipeId) {
        // Fetch recipe details by ID
        this.recipeService.getRecipeById(recipeId).subscribe({
          next: (data) => {
            this.recipe = data;
            this.isEdit = true;
            this.categorySearch = data.categoryName;
            // Set the image URL based on imageData

            if (data.imageData) {
              this.recipe.imageUrl = 'data:image/jpg;base64,' + data.imageData;
              this.file = new File([data.imageData], data.name + '.jpg');
              this.existingImageUrl = 'data:image/jpeg;base64,' + data.imageData;
            }
    
          },
          error: (error) => {
            console.error('Error fetching recipe:', error);
          }
        });
      } else {
        this.isEdit = false;
      }
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  

  filterCategories(): void {
    // Filter categories based on the user's input
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.categorySearch.toLowerCase())
    );
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
  }

  onSaveClick() {

  
    if (this.isEdit) {
      // Call your service's method to edit the recipe
      this.recipeService.editRecipe(this.recipe, this.file).subscribe({
        next: (response) => {
          console.log('Recipe edited successfully:', response);
        },
        error: (error) => {
          console.error('Error editing recipe:', error);
        },
      });
    } else {
      // Call your service's method to add the recipe
      this.recipeService.addRecipe(this.recipe, this.file).subscribe({
        next: (response) => {
          console.log('Recipe added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding recipe:', error);
        },
      });
    }
  }
  


  getAllCategories(page: number): void {
    
    this.categoryService.getAllCategories(page, 100)
      .subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
  }

  private handleResponse(response: categoryPage): void {
    this.categories = response.content;
    this.filteredCategories = this.categories; 
  }

  private handleError(error: any): void {
    console.error('Error searching categories:', error);
    // You can add error handling logic here, e.g., displaying an error message.
  }
}
