import { Component, OnInit, Input } from '@angular/core';
import { PostsManagementService } from '../services/posts-management.service';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit {

  constructor(private postsService: PostsManagementService) { }

  @Input() postTitle: string; 
  @Input() postContent: string;  
  @Input() postLoveIts: number;  
  @Input() postCreated_at: string;
  @Input() localId: number;

  addLike() {
    this.postsService.likeAPost(this.postTitle);

  }
  subLike(){
    this.postsService.dyslikeAPost(this.postTitle);
  }

  ngOnInit() {
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
    console.log('Here');
    this.postsService.deletePost(this.postTitle);
  }

}
