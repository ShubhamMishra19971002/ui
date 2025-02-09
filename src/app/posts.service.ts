import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:5000/post-details'; 

  constructor(private http: HttpClient) {}

 
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`);
  }
}
