import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit() {
    const token = localStorage.getItem('token'); 
    console.log('jsdlkjks',token)
    if (token) {
      console.log('jsdlkjks',token)
      this.router.navigate(['/dashboard']); 
    }
  }
  loginWithGoogle() {
    window.location.href = 'http://localhost:5000/auth/google';
  }
}
