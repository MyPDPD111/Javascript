import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPROJECT } from 'src/app/module/project';
import { ProjectApiService } from 'src/app/services/project-api.service';
import { AuthApiService } from '../../services/auth-api.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: IPROJECT[] = []
  constructor(private ProjectApiService: ProjectApiService, private AuthApiService: AuthApiService) { }
  loading = true;
  isCheck = false
  ngOnInit(): void {
    this.AuthApiService.getUserLocal().subscribe((res) => {
      const {user} = res;
      if(user.role === "admin"){
        this.isCheck = true
      }
    })
    let that = this
    this.ProjectApiService.getProject().subscribe((data) => {
      console.log(data);
      this.projects = data.Projects
      setTimeout(() => {
        that.loading = false
      }, 1000);
    })
  }

  remove(id: any) {
    if(window.confirm("Bạn có muốn xóa không")){
      let that = this
      this.ProjectApiService.deleteProject(id).subscribe((data) => {
        console.log(data);
        setTimeout(() => {
          that.loading = false
        }, 1000);
      })
      this.projects = this.projects.filter((item) => item._id !== id)
    }
  }

}

// đây là một Component được sử dụng để hiển thị danh sách các dự án và cho phép người dùng xóa một dự án nếu có quyền hạn.
