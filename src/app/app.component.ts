import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { JsonPlaceholderService, PostResponse } from './services/json-placeholder.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  posts: PostResponse[] = [];
  filteredPosts: PostResponse[] = [];
  users: number[] = [];

  userFormControl: FormControl = new FormControl(null);

  constructor(private service: JsonPlaceholderService) {

  }

  ngOnInit(): void {
    this.service.fetchPosts().subscribe({
      next: (response) => {
        this.posts = [...response];
        this.filteredPosts = [...this.posts];
        this.users = [...new Set(response.map(post => post.userId))];
        console.log(this.users);
      }
    });
    this.userFormControl.valueChanges.subscribe(value => {
      if(value) {
        this.filteredPosts = this.posts.filter(post => post.userId === value);
      } else {
        this.filteredPosts = [...this.posts];
      }
    });
  }


}
