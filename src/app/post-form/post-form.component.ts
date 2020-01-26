import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post/post.module';
import { PostsManagementService } from '../services/posts-management.service';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

	postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  fileCroppedIsUploading = false;
  fileCroppedUrl: string;
  fileCroppedUploaded = false;

  imageChangedEvent: any = '';
   croppedImage: any = '';
   fileCropped: File; 


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

  public blobToFile = (theBlob: Blob, fileName:string): File => {
      var b: any = theBlob;
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      b.lastModifiedDate = new Date();
      b.name = fileName;

      //Cast to a File() type
      return <File>theBlob;
  }

  onSavePost() {

      this.onUploadCroppedFile(this.fileCropped);
	}

  onUploadFile(file: File) {
      this.fileIsUploading = true;
      this.postsService.uploadFile(file).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
  }

  onUploadCroppedFile(file: File) {
      this.fileCroppedIsUploading = true;
      this.postsService.uploadFile(file).then(
        (url: string) => {
          this.fileCroppedUrl = url;
          this.fileCroppedIsUploading = false;
          this.fileCroppedUploaded = true;
          console.log("URL file Cropped " + this.fileCroppedUrl);

          var newPost = new Post();
          const title = this.postForm.get('title').value;
          const content = this.postForm.get('content').value;
          newPost.title = title;
          newPost.content = content;
          const date = new Date();
          newPost.created_at = date.toString();
          newPost.loveIts = 0;
          if(this.fileUrl && this.fileUrl !== '') {
            newPost.photo = this.fileUrl;
          }
          if(this.fileCroppedUrl && this.fileCroppedUrl !== ''){
            newPost.photoCropped = this.fileCroppedUrl;
          }
          this.postsService.creatNewPost(newPost);
          this.router.navigate(['']);
        }
      );
  }

  detectFiles(event) {
    //Send data to server
      this.onUploadFile(event.target.files[0]);
    //Show the picture to crop
      this.imageChangedEvent = event;
  }

  fileChangeEvent(event: any): void {
      
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      //Transform base64 to Blob
      const contentType = 'image/png';
      var b64Data = event.base64;
      //Changer le 22 ?
      var data64 = b64Data.slice(22);
      var blob = this.base64toBlob(data64, contentType);  
      //Adapter le nom
      this.fileCropped = this.blobToFile(blob,"Test crop and convert");
      console.log(this.fileCropped);
   }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  loadCroppedImage(){

  }

  uploadCroppedImage(){
    
  }

  base64toBlob(base64Data, contentType) {
      contentType = contentType || '';
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
          var begin = sliceIndex * sliceSize;
          var end = Math.min(begin + sliceSize, bytesLength);

          var bytes = new Array(end - begin);
          for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
              bytes[i] = byteCharacters[offset].charCodeAt(0);
          }
          byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return new Blob(byteArrays, { type: contentType });
  }
}
