import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mon-premier-blog';

 constructor( ) {
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
 }

ngOnInit() {}

}
