import { Component, OnInit } from '@angular/core';
import { TaskApiService } from '../../services/task-api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProjectApiService } from 'src/app/services/project-api.service';

@Component({
  selector: 'app-taskcreate',
  templateUrl: './taskcreate.component.html',
  styleUrls: ['./taskcreate.component.css'],
})
export class TaskcreateComponent implements OnInit {
  constructor(
    private TaskApiService: TaskApiService,
    private router: Router,
    private ProjectApiService: ProjectApiService
  ) {}
  listUser: Array<any> = [];   //mảng chứa danh sách người thực hiện (performer) của dự án đã chọn.
  listProject: Array<any> = []; //mảng chứa danh sách dự án.
  performer: any = {};  //chứa thông tin người được chọn để thực hiện công việc.
  projectData: any = {}; //chứa thông tin dự án được chọn để tạo mới công việc.
  listUserFilter: any = []; //mảng chứa kết quả tìm kiếm người thực hiện theo từ khóa tìm kiếm.
  listProjectFilter: any = []; //mảng chứa kết quả tìm kiếm dự án theo từ khóa tìm kiếm.
  ngOnInit(): void {
    this.ProjectApiService.getProject().subscribe((data) => {
      this.listProject = data.Projects;
      this.listProjectFilter = data.Projects;
    });
  }
  search = '';
  searchProject = ''  //lưu từ khóa tìm kiếm của người thực hiện và dự án.
  filter(e: any) {      //hàm xử lý sự kiện tìm kiếm người thực hiện.
    this.search = e.target.value;
    if (e.target.value !== '') {
      this.listUserFilter =  this.listUser.filter((item: any) => item.userId.name.toLowerCase().includes(e.target.value.toLowerCase()));
    }
  }

  filterProject(e: any){  //hàm xử lý sự kiện tìm kiếm dự án.
    this.searchProject = e.target.value;
    if (e.target.value !== '') {
      this.listProjectFilter = this.listProject.filter((project: any) =>
        project.projectName.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
  }

  onRemoveAss() {  //hàm xử lý sự kiện bỏ chọn người thực hiện.
    this.performer = {};
  }

  onAddUser(user: any) {   //hàm xử lý sự kiện chọn người thực hiện.
    this.performer = user
    console.log(user);
    this.search = '';
  }

  onAddProject(data: any){  //hàm xử lý sự kiện chọn dự án.
    this.projectData = data;
    this.listUser = data.member;
    this.listUserFilter = data.member
    this.searchProject = ''
  }

  onRemoveProject(){    //hàm xử lý sự kiện bỏ chọn dự án.
    this.projectData = {}
    this.listUser = []
    this.searchProject = ''
    this.search = ''
  }


  submitAddTaskForm(f: NgForm) {  //hàm xử lý sự kiện submit form, gọi API để tạo mới công việc
    const task = {
      nameTask: f.value.nameTask,
      desc: f.value.desc,
      projectId: this.projectData._id,
      performer: this.performer.userId._id,
      startDate: f.value.startDate,
    };
    console.log('====================================');
    console.log(task);
    console.log('====================================');
    this.TaskApiService.postTask(task).subscribe((data) => {
      if (data.success) {
        this.router.navigate(['list-task']);
      }
    });
  }
}
