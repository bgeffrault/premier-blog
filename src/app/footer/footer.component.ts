import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Post } from './../models/post/post.module';
import { Subscription } from 'rxjs';
import { PostsManagementService } from './../services/posts-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuth: boolean;
  postList : Post[] = [];
  postsSubscription: Subscription;

  constructor(private authService: AuthService, private postsService: PostsManagementService, private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
      	console.log('Data from home page ', posts);
        this.postList = posts.reverse();
      }
    );
    this.postsService.emitPosts();
  }

  onSignOut() {
    this.authService.signOutUser();
  }
  
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
