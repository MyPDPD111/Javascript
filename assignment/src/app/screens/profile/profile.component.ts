import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private UserService: UserService) { }

  user: any = {};
  ngOnInit(): void {
    if(localStorage.getItem('user') !== undefined && localStorage.getItem('user')){
      const userLocal:any = localStorage.getItem('user')
      this.user = JSON.parse(userLocal)
    }else{
      this.router.navigate(['/login'])
    }
  }

  submitProfileForm(f: NgForm){
      this.UserService.updateUser(this.user._id, f.value).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data.user))
      })
  }

}
