import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../../models/post/post.module';
import { Subscription } from 'rxjs';
import { PostsManagementService } from '../../services/posts-management.service';
import { Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: ['./home-page-view.component.scss']
})
export class HomePageViewComponent implements OnInit {

  postList : Post[] = [];
  positions: string[] = ['First slide','Second slide','Third slide'];

 postsSubscription: Subscription;
 
  constructor(private postsService: PostsManagementService, private router: Router ) {
	      this.postsService.getPosts();
	}

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.postList = posts.reverse();
      }
    );
    this.postsService.emitPosts();

  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  scrollToTop(){
  	window.scrollTo(0,0);
  }

}
