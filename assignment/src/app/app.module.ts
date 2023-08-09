import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialExampleModule} from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ListtaskComponent } from './screens/listtask/listtask.component';
import { NavbarLeftComponent } from './components/navbar-left/navbar-left.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskeditComponent } from './components/taskedit/taskedit.component';
import { TaskcreateComponent } from './components/taskcreate/taskcreate.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { DateRangePickerOverviewExampleComponent } from './components/date-range-picker-overview-example/date-range-picker-overview-example.component';
import {MatNativeDateModule} from '@angular/material/core';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileEmailComponent } from './components/profile-email/profile-email.component';

import { AuthGuard } from './guard/auth.guard';
import { ProjectListComponent } from './screens/project-list/project-list.component';
import { ProjectAddComponent } from './screens/project-add/project-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserListComponent } from './screens/user-list/user-list.component';
import { ProjectEditComponent } from './screens/project-edit/project-edit.component';
import { ProjectListDetailComponent } from './screens/project-list-detail/project-list-detail.component';
import { RegisterComponent } from './screens/register/register.component';
import { AuthInterceptor } from './common/auth-interceptor';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListtaskComponent,
    NavbarLeftComponent,
    NavbarTopComponent,
    TaskeditComponent,
    TaskcreateComponent,
    ProfileComponent,
    DateRangePickerOverviewExampleComponent,
    LoadingComponent,
    ProfileEmailComponent,
    ProjectListComponent,
    ProjectAddComponent,
    UserListComponent,
    ProjectEditComponent,
    ProjectListDetailComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
