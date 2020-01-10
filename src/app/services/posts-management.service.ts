import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database/dist/index.cjs';
import { Post } from '../models/post/post.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsManagementService {

  constructor() {
  }

  posts : Post[] = [];
  postsSubject = new Subject<Post[]>();

  emitPosts() {
		this.postsSubject.next(this.posts);
	}

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts);
    console.log('Date send');
  }

  creatNewPost(newPost: Post){
    this.posts.push(newPost);
    console.log('Posts :',this.posts);
    this.savePosts();
    this.emitPosts();
  }

  deletePost(postTitle: string){
    const index = this.posts.findIndex(element => element.title == postTitle);
    if (index > -1) {
       this.posts.splice(index, 1);
    }
    this.savePosts();
    this.emitPosts();
  }

  likeAPost(postTitle: string){
    console.log("Posts :",this.posts);
    const index = this.posts.findIndex(element => element.title == postTitle);
    this.posts[index].loveIts = this.posts[index].loveIts + 1;
    this.savePosts();
    this.emitPosts();
  }

  dyslikeAPost(postTitle: string){
    const index = this.posts.findIndex(element => element.title == postTitle);
    this.posts[index].loveIts = this.posts[index].loveIts - 1;
    this.savePosts();
    this.emitPosts();
  }


}
