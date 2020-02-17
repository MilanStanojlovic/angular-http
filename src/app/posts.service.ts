import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Post } from './post.model';
import { pipe } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PostsService {
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    this.http.post('https://angular-http-976ae.firebaseio.com/posts.json',
      postData, {
      observe: 'response'
    }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://angular-http-976ae.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({
          "Custom-Header": "Hello",
        }),
        responseType: 'json'
      })
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }))
  }

  deletePosts() {
    return this.http.delete('https://angular-http-976ae.firebaseio.com/posts.json', {
      observe: 'events', 
      responseType: 'text'
    }).pipe(tap(event => {
      console.log( event );
      if(event.type === HttpEventType.Sent){
        // ...
      }
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
    }));
  }
}