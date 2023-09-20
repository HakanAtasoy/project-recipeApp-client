import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { RecipeDetailsService } from '../services/recipe-details.service';
import { Recipe } from '../recipe/recipe.model';
import { RecipeDetail } from './recipe-detail.model';
import { Review } from '../review/review.model';
import { ToastrService } from 'ngx-toastr';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {

  recipeId: number ;
  recipe: Recipe;
  likes: number;
  isLikedByUser: boolean;
  reviews: Review[] ;
  newComment: string = ''; 

  constructor(private route: ActivatedRoute, private router: Router,  private toastr: ToastrService,
    private recipeService: RecipeService, private recipeDetailsService: RecipeDetailsService) {
    this.recipeId = 0; // Initialize with a default value
    this.recipe = {} as Recipe; // Initialize with an empty recipe
    this.likes = 0;
    this.isLikedByUser = false;
    this.reviews = [];
    this.route.params.subscribe(params => {
      this.recipeId = +params['recipeId']; // '+' is used to convert the string to a number

      // Call the 'getRecipe' method to fetch the recipe data
      console.log(this.recipeId);
      this.getRecipeDetails(); // GETRECİPEDETAİLS E DÖNDÜR ONUN İÇİNDEN RECİPE FAV COUNT USERİNFO REVİEWLİST KULLAN
    });
  }

  // Function to fetch the recipe data
  getRecipeDetails() {
    this.recipeDetailsService.getRecipeDetails(this.recipeId).subscribe({
      next: (data: RecipeDetail) => {
        // Assign the fetched recipe data to 'this.recipe'
        this.recipe = data.recipeModel;
        this.likes = data.likeCount;
        this.isLikedByUser = data.inUsersFavorites;
        this.reviews = data.reviews;
        console.log(this.recipe);
        console.log(this.likes);
        console.log(this.isLikedByUser);
        console.log(this.reviews);

      },
      error: (error: any) => {
        // Handle errors, e.g., show an error message
        console.error('Error fetching recipe details:', error);
      },
    });
  }


    // Function to toggle like for the recipe
    toggleLike() {
      if (this.isLikedByUser) {
        // If already liked, implement the logic to unlike the recipe
        this.recipeDetailsService.unlikeRecipe(this.recipeId).subscribe({
          next: (unliked: boolean) => {
            if (unliked) {
              console.log('Unliked response:', unliked); // Log the response

              this.isLikedByUser = false;
              this.likes--; // Decrement the likes count
            } 
            else {
              // Handle the case where unliking was not successful
              console.error('Error unliking the recipe');
            }
          },
          error: (error: any) => {
            console.error('Error unliking the recipe:', error);
          },
        });
      } 
      else {
        // If not liked, implement the logic to like the recipe
        this.recipeDetailsService.likeRecipe(this.recipeId).subscribe({
          next: (response: void | 'guest') => {
            if(response === 'guest'){
              this.toastr.error('Beğenmek için giriş yapın.');
            }
            else {
              this.isLikedByUser = true;
              this.likes++; // Increment the likes count
            }
          },
          error: (error: any) => {
            console.error('Error liking the recipe:', error);
          },
        });
        
           
      }
    }
    

    addComment() {
      this.recipeDetailsService.addComment(this.recipeId, this.newComment).subscribe({
        next: (newReview: Review | 'guest') => {
          if (newReview === 'guest') {
            // Handle the case where the user is a guest (not logged in)
            this.toastr.error('Yorum yapmak için giriş yapın.');
          } else {
            // Add the returned review to the reviews array
            this.reviews.push(newReview);
            this.newComment = ''; // Clear the input field
            console.log("wohooooooo");
            console.log(newReview.createDate);
          }
        },
        error: (error: any) => {
          console.error('Error adding a comment:', error);
          // Handle the error as needed, e.g., show an error message to the user
        },
      });
    }
    
    
    formatDateOrNA(createDate: Date | null): string {
      if (createDate) {
        const dateObj = new Date(createDate);
        return this.recipeDetailsService.formatTimeDifference(dateObj);
      } else {
        return 'N/A';
      }
    }


  /*
    likeComment(comment: Review) {
      this.recipeDetailsService.likeComment(comment.id).subscribe({
        next: () => {
          comment.isLiked = true;
          comment.likeCount++;
        },
        error: (error: any) => {
          console.error('Error liking a comment:', error);
        },
      });
    }
  

  comments: any[] = [
    {
      user: 'User 1',
      text: 'This recipe is amazing!',
      replies: [
        { user: 'User 2', text: 'I agree, it tastes delicious!' },
        { user: 'User 3', text: 'I tried it too, and it turned out great.' }
      ]
    },
    {
      user: 'User 4',
      text: 'I had to adjust the ingredients, but it still worked well.',
      replies: [
        { user: 'User 5', text: 'What adjustments did you make?' }
      ]
    },
    // Add more comments and replies as needed
  ];
*/
}
