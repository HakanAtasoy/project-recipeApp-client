import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]],
    });
    
  }

  onSubmit(event: Event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Rest of your code here
    if (this.signupForm.invalid) {
      return;
    }

    const formValue = this.signupForm.value;
    const userName = formValue.userName;
    const firstName = formValue.firstName;
    const lastName = formValue.lastName;
    const password = formValue.password;
  
    // Call your authentication service with the form values
    this.authService.signup(userName, firstName, lastName, password).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
    
        if (response.success) {
          // Handle successful signup
          this.showSuccess('Kayıt başarılı!'); // Display success notification
        } else {
          // Handle unsuccessful signup
          if (response.message === "Username is already taken") {
            this.showError('Bu kullanıcı adı zaten mevcut.'); // Username already exists
          } else if (response.message === "Lütfen geçerli bir istek gönderin.") {
            this.showError('Lütfen geçerli bir istek gönderin.'); // Bad request, invalid input
          } else {
            this.showError('Bir hata oluştu: ' + response.message); // Handle other errors
          }
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle other errors, if any
      },
      complete: () => {
        // This block is called when the observable completes
      },
    });
    
    
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success');
  }

  showError(errorMessage: string) {
    this.toastr.error(errorMessage, 'Error');
  }
}
