import { Category } from '../category/category.model';

export interface categoryPage {
    content: Category[]; // This should match the type of your Recipe model
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  }