import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { NotebookComponent } from './notebook/notebook.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ReviewComponent } from './review/review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminComponent } from './admin/admin.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
//import {AngularDropDownSearchComponent} from "angular-dropdown-search/projects/angular-drop-down-search/src/lib/angular-drop-down-search.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CarouselComponent,
    SearchComponent,
    NotebookComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    CategoryComponent,
    FavoriteComponent,
    ReviewComponent,
    AdminComponent,
    AddCategoryComponent,
    ManageCategoriesComponent,
    //AngularDropDownSearchComponent,
    //NgxDropdownModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
