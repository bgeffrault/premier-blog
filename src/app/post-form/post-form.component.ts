import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post/post.module';
import { PostsManagementService } from '../services/posts-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

	postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
  			  private postsService: PostsManagementService,
              private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSavePost() {
	  	var newPost = new Post();
	    const title = this.postForm.get('title').value;
	    const content = this.postForm.get('content').value;
	    newPost.title = title;
	    newPost.content = content;
	    const date = new Date();
	    newPost.created_at = date.toString();
	    newPost.loveIts = 0;
	    this.postsService.creatNewPost(newPost);
	    this.router.navigate(['']);
	}

}
