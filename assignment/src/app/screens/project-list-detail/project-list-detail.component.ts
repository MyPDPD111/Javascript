import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../../services/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-project-list-detail',
  templateUrl: './project-list-detail.component.html',
  styleUrls: ['./project-list-detail.component.css']
})
export class ProjectListDetailComponent implements OnInit {

  constructor(private ProjectApiService: ProjectApiService, private route: ActivatedRoute, private router: Router, private UserService: UserService, private TaskApiService: TaskApiService) { }
  projectEdit:any = {};   //đối tượng chứa thông tin chi tiết của dự án được hiển thị
  listUser: any = []; //mảng chứa danh sách các người dùng;
  members: any = [];  //mảng chứa danh sách các thành viên tham gia dự án
  listUserFilter: any = [];  //mảng chứa danh sách các người dùng để lọc kết quả tìm kiếm
  listTaskFilter: any = []   //mảng chứa danh sách các công việc để lọc kết quả tìm kiếm
  search = '';
  listTask: any = []  //mảng chứa danh sách các công việc của dự án
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.ProjectApiService.getOneProject(id).subscribe((data) => {
        this.projectEdit =  data.project
        this.members = data.project.member
      })
    }
    this.UserService.getUsers().subscribe((data) => {
      this.listUser = data;
      this.listUserFilter = data;
    });

    const searchProject = `?projectId=${id}`
    this.TaskApiService.getTask(searchProject).subscribe((data) => {
        this.listTask = data.tasks
        this.listTaskFilter = data.tasks
        console.log(data.tasks);
    })

  }

  taskStatus: any = {}  //đối tượng chứa thông tin trạng thái của công việc
  isShowModal = false;   //biến đánh dấu hiển thị cửa sổ Modal để cập nhật trạng thái của công việc.

  onShowModalStatus(id: String, status: string) {   // được sử dụng để hiện thị cửa sổ Modal để cập nhật trạng thái của công việ
    console.log(id);

    this.taskStatus = {
      id, status
    };
    this.isShowModal = true;
  }

  onSetStatus(status: String){  //được sử dụng để cập nhật trạng thái của công việc trong đối tượng `taskStatus`.
    this.taskStatus.status = status
  }

  filter(e: any){  //được sử dụng để lọc kết quả tìm kiếm công việc dựa trên từ khóa tìm kiếm
    this.search = e.target.value;
    this.listTaskFilter = this.listTask.filter((item: any) =>
        item.nameTask.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(this.listTaskFilter);

  }

  updateStatus(){  // được sử dụng để cập nhật trạng thái công việc thông qua API
    const task = this.listTask.find((item: any) => item._id === this.taskStatus.id);
    if(task){
      task.status = this.taskStatus.status
    }
    this.TaskApiService.updateStatus(this.taskStatus.id, {status: this.taskStatus.status}).subscribe((res) => {
      console.log(res);
        if(res.success){
          this.isShowModal = false;
        }
    })


  }

}
