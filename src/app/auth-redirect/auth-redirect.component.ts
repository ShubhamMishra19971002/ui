import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-redirect',
  template: `<p>Authenticating...</p>`,
})
export class AuthRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("auth")
      debugger
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token); // Store token
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      } else {
        this.router.navigate(['/login']); // Redirect if no token
      }
    });
  }
}