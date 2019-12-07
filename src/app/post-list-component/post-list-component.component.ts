import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit {

  constructor() { }

  @Input() postTitle: string; 
  @Input() postContent: string;  
  @Input() postLoveIts: number;  
  @Input() postCreated_at: string;
  @Input() localId: number;

  addLike() {
    this.postLoveIts = this.postLoveIts+1;
    console.log("was here");
  }
  subLike(){
    this.postLoveIts = this.postLoveIts-1;
    console.log("was here");
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

}
