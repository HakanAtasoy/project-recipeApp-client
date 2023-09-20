import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  searchQuery: string = '';
  username: string | null = '';
  website_name: string = "EnfesYemekTarifleri"
  constructor(public authService: AuthService, private router: Router, 
    private activatedRoute: ActivatedRoute  // Inject ActivatedRoute
    ) {}


  ngOnInit() {
    this.activatedRoute.url.subscribe(() => {
      this.getUserName();
    }); // Call it during initialization

  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/']);

  }

  onSearch() {
    // Navigate to the SearchComponent with the search query as a query parameter
    this.router.navigate(['/recipes'], {
      queryParams: { 'searchQuery': this.searchQuery, 'categoryId': 0, 'page': 1 },
    });
  }

  getUserName(): void {
    const storedUsername = sessionStorage.getItem('username');
    this.username = storedUsername ? storedUsername : 'Guest';
    // this.cdr.detectChanges();  // Trigger change detection
  }
}
