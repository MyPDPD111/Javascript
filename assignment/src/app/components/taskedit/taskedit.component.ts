import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from 'src/app/services/task-api.service';
import { TASK } from '../../module/task';
import { UserService } from '../../services/user.service';
import { ProjectApiService } from '../../services/project-api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-taskedit',
  templateUrl: './taskedit.component.html',
  styleUrls: ['./taskedit.component.css']
})
export class TaskeditComponent implements OnInit {

  constructor(
    private TaskApiService: TaskApiService,  // để thực hiện các yêu cầu HTTP tới API server để cập nhật thông tin công việc.
    private router: Router, //được sử dụng để thực hiện điều hướng đến trang khác nếu cần thiết.
    private UserService: UserService, // sử dụng để lấy thông tin người dùng.
    private ProjectApiService: ProjectApiService,  //được sử dụng để lấy thông tin về dự án
    private route: ActivatedRoute  //được sử dụng để lấy thông tin về đường dẫn URL hiện tại và thực hiện các thao tác liên quan đến định tuyến.
  ) {}

  listUser: Array<any> = [];
  listProject: Array<any> = [];
  performer: any = {};
  projectData: any = {};
  listUserFilter: any = [];
  listProjectFilter: any = [];
  taskEdit: any = {};
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.TaskApiService.getOneTask(id).subscribe((data) => {
        console.log(data);
        this.taskEdit =  data.task;
        this.projectData = data.task.projectId;
        this.performer = data.task.performer;
        this.ProjectApiService.getOneProject(data.task.projectId._id).subscribe((res) => {
          console.log(res);

          this.listProjectFilter = res.project.member;
          this.listUser = res.project.member;
        });
      })
    }
    this.ProjectApiService.getProject().subscribe((data) => {
      this.listProject = data.Projects;
      this.listProjectFilter = data.Projects;
    });
  }
  search = '';
  searchProject = ''
  filter(e: any) {
    this.search = e.target.value;
    if (e.target.value !== '') {
      this.listUserFilter =  this.listUser.filter((item: any) => item.userId.name.toLowerCase().includes(e.target.value.toLowerCase()));
    }
  }

  filterProject(e: any){
    this.searchProject = e.target.value;
    if (e.target.value !== '') {
      this.listProjectFilter = this.listProject.filter((project: any) =>
        project.projectName.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
  }
// được sử dụng để lọc các user và dự án tùy thuộc vào từ khóa search.
  onRemoveAss() {
    this.performer = {};
  }
// được sử dụng để xóa user ra khỏi danh sách người thực hiện
  onAddUser(user: any) {
    this.performer = user.userId
    console.log(user);
    this.search = '';
  }

  onAddProject(data: any){
    this.projectData = data;
    this.listUser = data.member;
    this.listUserFilter = data.member
    this.searchProject = ''
  }
//  sử dụng để thêm user và dự án vào danh sách user
  onRemoveProject(){
    this.projectData = {}
    this.listUser = []
    this.searchProject = ''
    this.search = ''
  }
//được sử dụng để xóa dự án khỏi danh sách dự án liên quan.
  submitAddTaskForm(f: NgForm) {

    const task = {
        nameTask: f.value.nameTask,
        desc: f.value.desc,
        projectId: this.projectData._id,
        performer: this.performer._id,
        startDate: f.value.startDate,
    }
    console.log('====================================');
    console.log(task);
    console.log('====================================');
    this.TaskApiService.putTask(this.taskEdit._id, task).subscribe((data) => {
      if (data.success) {
        this.router.navigate(['list-task']);
      }
    });
  }
}
//được sử dụng khi người dùng thêm hoặc cập nhật thông tin công việc
