import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../models/post/post.module';
import { Subscription } from 'rxjs';
import { PostsManagementService } from '../services/posts-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {

	postList : Post[] = [];

 	postsSubscription: Subscription;

  constructor(private postsService: PostsManagementService, private router: Router ) {
      this.postsService.getPosts();
}

  ngOnInit() {
  	console.log('Init :');
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
      	console.log('Data ', posts);
        this.postList = posts;
      }
    );
    console.log('Posts :', this.postList);
    this.postsService.emitPosts();
  }

  getColor(i) {
 	var index = parseInt(i);
    console.log("Index : "+index);
    if(index % 2 === 0){
        return '#E9C46A';
    } else {
        return '#F4A261';
    }
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
