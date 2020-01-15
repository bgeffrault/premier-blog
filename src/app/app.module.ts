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

const appRoutes: Routes = [
  { path: '', redirectTo: 'app-posts-view', pathMatch: 'full' },
  { path: '**', redirectTo: 'app-posts-view' },
  { path: 'calendar', component:  CalandarViewComponent },
  { path: 'creatPost', component: PostFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponentComponent,
    PostFormComponent,
    PostsViewComponent,
    CalandarViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
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
