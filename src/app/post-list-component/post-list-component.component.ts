import { Component, OnInit, Input } from '@angular/core';
import { PostsManagementService } from '../services/posts-management.service';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit {

  constructor(private authService: AuthService, private postsService: PostsManagementService) { }

  @Input() postTitle: string; 
  @Input() postContent: string;  
  @Input() postLoveIts: number;  
  @Input() postCreated_at: string;
  @Input() photo: string;
  @Input() localId: number;

  isAuth: boolean;
  width : number;
  height : number;

  addLike() {
    this.postsService.likeAPost(this.postTitle);

  }
  subLike(){
    this.postsService.dyslikeAPost(this.postTitle);
  }

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

  }

  getColor() {
    console.log("localID : "+this.localId);
    if(this.localId % 2 === 0){
        return '#E9C46A';
    } else {
        return '#F4A261';
    }
  }

  deleteThisPost(){
    this.postsService.deletePost(this.postTitle);
  }


}
