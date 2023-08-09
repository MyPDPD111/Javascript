import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEmailComponent } from './components/profile-email/profile-email.component';
import { TaskcreateComponent } from './components/taskcreate/taskcreate.component';
import { TaskeditComponent } from './components/taskedit/taskedit.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ListtaskComponent } from './screens/listtask/listtask.component';
import { LoginComponent } from './screens/login/login.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { ProjectAddComponent } from './screens/project-add/project-add.component';
import { ProjectEditComponent } from './screens/project-edit/project-edit.component';
import { ProjectListDetailComponent } from './screens/project-list-detail/project-list-detail.component';
import { ProjectListComponent } from './screens/project-list/project-list.component';
import { RegisterComponent } from './screens/register/register.component';
import { UserListComponent } from './screens/user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'dash-board',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'list-task',
    component: ListtaskComponent
  },
  {
    path: 'du-an/chi-tiet/:id',
    component: ProjectListDetailComponent
  },
  {
    path: 'create-task',
    component: TaskcreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-task/:id',
    component: TaskeditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/email',
    component: ProfileEmailComponent
  },
  {
    path: 'du-an',
    component: ProjectListComponent,
  },
  {
    path: 'du-an/edit/:id',
    component: ProjectEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'du-an/them-moi',
    component: ProjectAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'member',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
