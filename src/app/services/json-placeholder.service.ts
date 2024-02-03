import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';

export type PostResponse = {
  userId: number,
  id: number,
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {

  private readonly URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get<PostResponse[]>(this.URL).pipe(take(10));
  }

}
