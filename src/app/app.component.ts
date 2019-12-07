import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mon-premier-blog';

 postList = [
 	{  
		title: 'Titre 1',  
		content: 'Content 1',  
		loveIts: 0,  
		created_at: "01/23/2019"
	},
	{  
		title: 'Titre 2',  
		content: 'Content 2',  
		loveIts: 10,   
		created_at: "05/12/2019"
	},
	{  
		title: 'Titre 3',  
		content: 'Content 3',  
		loveIts: 0,    
		created_at: new Date()
	} 
 ];

 getColor(i) {
 	var index = parseInt(i);
    console.log("Index : "+index);
    if(index % 2 === 0){
        return '#E9C46A';
    } else {
        return '#F4A261';
    }
  }

}
