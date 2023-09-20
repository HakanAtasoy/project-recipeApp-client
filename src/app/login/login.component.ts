import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.userName, this.password).subscribe({
      next: (response: any) => {
        console.log('Response:', response);

        if (response.success) {
          //this.showSuccess('Giriş başarılı');
        } else {
          this.showError(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.showError('Giriş başarısız.');
      },
      complete: () => {
        // This block is called when the observable completes
      },
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Hoşgeldiniz!');
  }

  showError(errorMessage: string) {
    this.toastr.error(errorMessage, 'Giriş yaparken bir hata oluştu.');
  }
}
