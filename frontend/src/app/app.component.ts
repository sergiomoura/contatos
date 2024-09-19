import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {
    http.get("http://localhost:5000/api/v1/docs").subscribe((res)=>{console.log(res)});
    console.log("teste") 
  }
}
