import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: any;
  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.fetchPost(postId);
    }
  }

  fetchPost(postId: string) {
    this.postService.getPostById(postId).subscribe(
      (data: any) => this.post = data,
      (error: any) => console.error('Error fetching post:', error)
    );
  }

}
