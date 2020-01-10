import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from './models/post/post.module';
import { Subscription } from 'rxjs';
import { PostsManagementService } from './services/posts-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mon-premier-blog';

 postList : Post[] = [];

 postsSubscription: Subscription;

 constructor( private postsService: PostsManagementService, private router: Router ) {
    const config = {
	        apiKey: "AIzaSyDMKskBflWI3ygLJGP91YqJYoH8BFdwyLg",
		    authDomain: "blog-angular-training.firebaseapp.com",
		    databaseURL: "https://blog-angular-training.firebaseio.com",
		    projectId: "blog-angular-training",
		    storageBucket: "blog-angular-training.appspot.com",
		    messagingSenderId: "388554287846",
		    appId: "1:388554287846:web:dee24bbc89826d87512927"
	    };
	    firebase.initializeApp(config);
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
