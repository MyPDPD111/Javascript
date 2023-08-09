import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  constructor(private router: Router, private AuthApiService: AuthApiService) { }
  user: any = {};
  ngOnInit(): void {
    if(localStorage.getItem('user') !== undefined && localStorage.getItem('user')){
      const userLocal:any = localStorage.getItem('user')
      this.user = JSON.parse(userLocal)
    }else{
      this.router.navigate(['/login'])
    }
  }

  logout(){
    this.AuthApiService.logout().subscribe((res) => {
      console.log(res);
      
      if(res.success){
        this.router.navigate(['/login'])
        localStorage.removeItem('user');
        localStorage.removeItem('token')
      }
    })
  }

}
