import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  // Redirects to Home
  toHome(): void {
    this.router.navigate(['movies']);
  }

  // Redirects to user Profile
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  // Logs user out and redirects to Welcome page
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  
}
