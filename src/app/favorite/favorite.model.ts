import { Recipe } from "../recipe/recipe.model";

export interface Favorite{
    id: number;
    createDate: Date | null;
    updateDate: Date | null;
    deleteDate: Date | null;
    recipeModel: Recipe;
    userId: number;
    userName: string;
    deleted: boolean;
    imageData: Blob | null;
}