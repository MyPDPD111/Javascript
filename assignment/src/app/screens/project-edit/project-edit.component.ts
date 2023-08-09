import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApiService } from 'src/app/services/project-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  constructor(private ProjectApiService: ProjectApiService, private route: ActivatedRoute, private router: Router, private UserService: UserService) { }
  projectEdit:any = {};
  listUser: any = [];
  members: any = [];
  listUserFilter: any = [];
  search = '';
  ngOnInit(): void {
    let that = this
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
    
  }
  filter(e: any) {
    this.members.forEach((item: any) => {
      this.listUser = this.listUser.filter(
        (user: any) => user._id !== item.userId._id
      );
    });
    this.search = e.target.value;
    if (e.target.value !== '') {
      this.listUserFilter = this.listUser.filter((user: any) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
  }

  onAddUser(user: any) {
    this.members.push({ userId: user });
    this.search = ''
  }
  onRemoveMembers(id: String) {
    this.members = this.members.filter((item: any) => item.userId._id !== id)
  }
  
  submitAddProjectForm(f: NgForm) {
    const memberId: any = [];
    this.members.forEach((item: any) => {
      memberId.push({
        userId: item.userId._id,
      });
    });

    f.value.member = memberId;
    f.value.project_money = +f.value.project_money
    this.ProjectApiService.putProject( this.projectEdit._id ,f.value).subscribe((data) => {
      if(data.success){
        this.router.navigate(['du-an'])
      }
    })
    
  }
}
