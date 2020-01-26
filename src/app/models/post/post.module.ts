import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Post {
	title: string; 
	content: string;  
	loveIts: number;
	created_at: string;//Pb pour sauvegarder dans firebase avec le format date
	photo: string;
	photoCropped: string;
	
	constructor() {
	}
 }
