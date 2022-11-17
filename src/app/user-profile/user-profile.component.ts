import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};

  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  // Get user information/credentials
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  // Update user information/credentials 
  updateUserInfo(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000,
      });
      // Redirects user back to login if username or password is changed, helps in avoiding errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login again with your updated credentials', 'OK', { duration: 2000 });
      }
    });
  }

  // Delete user account 
  deleteAccount(): void {
    if (confirm('Warning: Your Account will be deleted and all of its data.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'Account successfully deleted, come back soon!', 'OK',
          { duration: 2000 }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear;
      });
    }
  }

}
