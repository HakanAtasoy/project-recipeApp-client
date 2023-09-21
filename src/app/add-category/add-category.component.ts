import { Component } from '@angular/core';
import { Category } from '../category/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { categoryPage } from '../category/categoryPage.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {


  file!: File;
  imageUrl: string | null = null;
  existingImageUrl: string | null = null;
  categorySearch: String = ''; // To store the user's search input
  isEdit: boolean = false;
  category: Category = {
    id: 0,
    name: '',
    description: '',
    createDate: null,
    updateDate: null,
    deleteDate: null,
    deleted: false,
    imageData: null,
  };

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    ) {}

    ngOnInit() {

      const categoryId = this.route.snapshot.params['categoryId']; // Assuming you pass category ID through route
      if (categoryId) {
        // Fetch category details by ID
        this.categoryService.getCategoryById(categoryId).subscribe({
          next: (data) => {
            this.category = data;
            this.isEdit = true;
            this.categorySearch = data.name;
            // Set the image URL based on imageData

            if (data.imageData) {
              this.category.imageUrl = 'data:image/jpg;base64,' + data.imageData;
              this.file = new File([data.imageData], data.name + '.jpg');
              this.existingImageUrl = 'data:image/jpeg;base64,' + data.imageData;
            }
    
          },
          error: (error) => {
            console.error('Error fetching category:', error);
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
  

  selectFile(event: any) {
    this.file = event.target.files[0];
  }

  onSaveClick() {

  
    if (this.isEdit) {
      // Call your service's method to edit the category
      this.categoryService.editCategory(this.category, this.file).subscribe({
        next: (response) => {
          console.log('category edited successfully:', response);
        },
        error: (error) => {
          console.error('Error editing category:', error);
        },
      });
    } else {
      // Call your service's method to add the category
      this.categoryService.addCategory(this.category, this.file).subscribe({
        next: (response) => {
          console.log('category added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding category:', error);
        },
      });
    }
  }
  
}
