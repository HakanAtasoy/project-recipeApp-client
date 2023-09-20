import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { NotebookComponent } from './notebook/notebook.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CategoryComponent } from './category/category.component';
import { FavoriteComponent } from './favorite/favorite.component';


const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "categories", component:CategoryComponent},
  {path: "recipes", component:SearchComponent},
  {path: "auth/signup", component:SignupComponent},
  {path: "my-recipes", component:NotebookComponent},
  {path: "add-recipe", component:RecipeComponent},
  {path: "edit-recipe/:recipeId", component:RecipeComponent},
  {path: 'recipe-details/:recipeId', component:RecipeDetailsComponent},
  {path: "my-favorites", component:FavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // this.RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})

 }
