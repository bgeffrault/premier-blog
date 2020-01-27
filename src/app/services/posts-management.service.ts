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
          console.log("Get Posts succes");
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
            console.error("Get Post rejected");
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
    if(this.posts[index].photo) {
      const storageRef = firebase.storage().refFromURL(this.posts[index].photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    if(this.posts[index].photoCropped) {
      const storageRef = firebase.storage().refFromURL(this.posts[index].photoCropped);
      storageRef.delete().then(
        () => {
          console.log('PhotoCropped removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
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

  uploadFile(file: File) {
      return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
            .child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }
      );
  }


}
