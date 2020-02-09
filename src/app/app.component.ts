import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    // this.fetchPosts();
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http.post('https://angular-http-976ae.firebaseio.com/posts.json',
    //   postData).subscribe(response => {
    //     console.log(response);
    //   });
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPosts();
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(post => {
      console.log(post);
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  // this.http.get<{ [key: string]: Post }>('https://angular-http-976ae.firebaseio.com/posts.json')
  //   .pipe(map(responseData => {
  //     const postsArray: Post[] = [];
  //     for (const key in responseData) {
  //       if (responseData.hasOwnProperty(key)) {
  //         postsArray.push({ ...responseData[key], id: key });
  //       }
  //     }
  //     return postsArray;
  //   }))
  //   .subscribe(response => {
  //     // console.log(response);
  //     this.isFetching = false;
  //     this.loadedPosts = response;
  //   });
  // }
}
