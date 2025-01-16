import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Dynamic Components';

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
  ){}

  ngOnInit(): void {
  }
}
