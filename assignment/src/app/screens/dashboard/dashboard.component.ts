
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskApiService } from '../../services/task-api.service';
import { ProjectApiService } from '../../services/project-api.service';
import { UserService } from 'src/app/services/user.service';
import { TASK } from 'src/app/module/task';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private TaskApiService: TaskApiService, private ProjectApiService: ProjectApiService, private UserService: UserService, private AuthApiService: AuthApiService) { }
  listUser: any = [];
  listTask: TASK[] = []; 
  listProject: any = [];
  totalProject: number = 0;   
  isCheck = false
  user:any = {}  
  ngOnInit(): void {
    this.AuthApiService.getUserLocal().subscribe((res) => {
        const {user} = res;
        if(user.role === "admin"){
          this.isCheck = true
        }
        this.user = user
    })
    this.TaskApiService.getTask().subscribe((data) => {
      this.listTask = data.tasks
    })
    this.ProjectApiService.getProject().subscribe((data) => {
      console.log(data.Projects);
      this.listProject = data.Projects;
      if(data.Projects){
        data.Projects.forEach((item: any) => {
          this.totalProject += item.project_money
          console.log("project_money",item.project_money);
          
        });
      }
    })
    this.UserService.getUsers().subscribe((data) => {
      console.log(data);
      this.listUser = data
    })
  }

}
