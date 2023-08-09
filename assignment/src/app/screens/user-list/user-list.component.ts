import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<any> = []
  constructor(private UserService: UserService, private AuthApiService: AuthApiService) { }
  loading = true;
  isCheck = false
  ngOnInit(): void {
    this.AuthApiService.getUserLocal().subscribe((res) => {
      const {user} = res;
      if(user.role === "admin"){
        this.isCheck = true
      }
    })
    let that = this;
    this.UserService.getUsers().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        that.users = data
        that.loading = false
      }, 1000);
    })
  }

  removeAdmin(id: String){
    if(window.confirm("Bạn có muốn xóa quyền admin của user này không?")){
      this.UserService.updateUser(id, {role: "subcribe"}).subscribe((res) => {
        if(res.success){
          this.UserService.getUsers().subscribe((data) => {
            console.log(data);
            setTimeout(() => {
              this.users = data
              this.loading = false
            }, 1000);
          })
        }
      })
    }
    
  }

  updateAdmin(id: String){
    if(window.confirm("Bạn có muốn cấp quyền admin của user này không?")){
      this.UserService.updateUser(id, {role: "admin"}).subscribe((res) => {
        if(res.success){
          this.UserService.getUsers().subscribe((data) => {
            console.log(data);
            setTimeout(() => {
              this.users = data
              this.loading = false
            }, 1000);
          })
        }
      })
    }
    
  }

}
