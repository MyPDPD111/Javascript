import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthApiService } from 'src/app/services/auth-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private AuthApiService: AuthApiService) {}

  ngOnInit(): void {
    this.AuthApiService.getUserLocal().subscribe((res) => {
      console.log(res);

    })
  }
  submitLoginForm(f: NgForm) {    // lấy username và password từ biến f
    console.log(f.value);
    this.AuthApiService.login(f.value).subscribe((res) => {

      if(res.token){
        localStorage.setItem('token', JSON.stringify(res.token))
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['/dash-board'])
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
}
