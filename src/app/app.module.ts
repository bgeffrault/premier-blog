import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponentComponent } from './post-list-component/post-list-component.component';
import { PostsManagementService } from './services/posts-management.service';
import { CalendarServicesService } from './services/calendar-services.service';
import { PostFormComponent } from './post-form/post-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { CalandarViewComponent } from './calandar-view/calandar-view.component';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageViewComponent } from './homePage/home-page-view/home-page-view.component';

const appRoutes: Routes = [
  { path: '', component: HomePageViewComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'app-posts-view' },
  { path: 'calendar', component:  CalandarViewComponent },
  { path: 'creatPost', canActivate: [AuthGuardService], component: PostFormComponent },
  { path: 'signIn', component: SigninComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponentComponent,
    PostFormComponent,
    PostsViewComponent,
    CalandarViewComponent,
    SigninComponent,
    HomePageViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    PostsManagementService,
    CalendarServicesService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
