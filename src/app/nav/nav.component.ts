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
  role: string | null = '';
  website_name: string = "HUMUS"
  constructor(public authService: AuthService, private router: Router, 
    private activatedRoute: ActivatedRoute  // Inject ActivatedRoute
    ) {}


  ngOnInit() {
    this.activatedRoute.url.subscribe(() => {
      this.getUserName();
      this.getRole();
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

  getRole(): void {
    const storedRole = sessionStorage.getItem('role');
    this.role = storedRole;
    console.log('roleeeeeeeeeeeeeeeee')
    console.log(this.role)
    console.log(sessionStorage.getItem("authResponse"))

  }
}
