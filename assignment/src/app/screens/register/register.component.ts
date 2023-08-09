import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private AuthApiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
  }
  registerForm(f: NgForm) {
    console.log(f.value);
    
    this.AuthApiService.register(f.value).subscribe((data) => {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      if(data.name){
        localStorage.setItem('user', JSON.stringify(data))
        this.router.navigate(['dash-board'])
      }
    })
    
  }
}
