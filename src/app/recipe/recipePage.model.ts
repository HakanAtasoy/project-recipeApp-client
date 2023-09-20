import { Recipe } from '../recipe/recipe.model';

export interface recipePage {
    content: Recipe[]; // This should match the type of your Recipe model
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  }