import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponentComponent } from './post-list-component/post-list-component.component';
import { PostsManagementService } from './services/posts-management.service';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: '**', redirectTo: 'app-root' },
  { path: 'creatPost', component: PostFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponentComponent,
    PostFormComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
