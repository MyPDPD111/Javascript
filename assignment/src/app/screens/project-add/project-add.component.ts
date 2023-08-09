import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectApiService } from '../../services/project-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  constructor(
    private ProjectApiService: ProjectApiService,
    private router: Router,
    private UserService: UserService
  ) {}

  listUser: any = [];
  members: any = [];
  listUserFilter: any = [];
  search = '';
  ngOnInit(): void {
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
    f.value.member = this.members;
    f.value.project_money = +f.value.project_money;
    console.log(f.value);

    this.ProjectApiService.postProject(f.value).subscribe((data) => {
      if (data.success) {
        this.router.navigate(['du-an']);
      }
    });
  }
}
