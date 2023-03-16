import 'bootstrap';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAuthenticated= false;
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
  }
}
