import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  posts: any[] = [];
  isModalOpen = false;
  currentPost = { title: '', description: '' };
  editingIndex: number | null = null;
  apiUrl = 'http://localhost:5000/posts'; // Change according to your API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Fetch posts from API */
  fetchPosts() {
    this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() }).subscribe(
      data => this.posts = data,
      error => console.error('Error fetching posts:', error)
    );
  }

  /** Open modal for editing or creating a post */
  openModal(post: any = { title: '', description: '' }, index: number | null = null) {
    this.currentPost = { ...post };
    this.editingIndex = index;
    this.isModalOpen = true;
  }

  /** Close the modal */
  closeModal() {
    this.isModalOpen = false;
    this.currentPost = { title: '', description: '' };
    this.editingIndex = null;
  }

  /** Save or update post */
  savePost() {
    if (this.editingIndex !== null) {
      this.updatePost(this.posts[this.editingIndex]._id, this.currentPost);
    } else {
      this.createPost(this.currentPost);
    }
    this.closeModal();
  }

  /** Create a new post */
  createPost(post: any) {
    this.http.post(this.apiUrl, post, { headers: this.getAuthHeaders() }).subscribe(
      newPost => {
        this.posts.push(newPost);
        this.fetchPosts();
      },
      error => console.error('Error creating post:', error)
    );
  }

  /** Update an existing post */
  updatePost(id: string, updatedPost: any) {
    this.http.put(`${this.apiUrl}/${id}`, updatedPost, { headers: this.getAuthHeaders() }).subscribe(
      () => this.fetchPosts(),
      error => console.error('Error updating post:', error)
    );
  }

  /** Delete a post */
  deletePost(index: number) {
    const postId = this.posts[index]._id;
    this.http.delete(`${this.apiUrl}/${postId}`, { headers: this.getAuthHeaders() }).subscribe(
      () => this.fetchPosts(),
      error => console.error('Error deleting post:', error)
    );
  }
}
