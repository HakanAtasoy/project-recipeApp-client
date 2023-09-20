import { Favorite } from "./favorite.model";

export interface favoritePage {
    content: Favorite[]; 
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  }