import { Recipe } from "../recipe/recipe.model";
import { Review } from "../review/review.model";

export interface RecipeDetail{
    recipeModel: Recipe
    likeCount: number
    inUsersFavorites: boolean
    reviews: Review[]

}