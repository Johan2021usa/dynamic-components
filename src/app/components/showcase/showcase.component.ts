import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private zone: NgZone,
    private router: Router,
  ){}

  ngOnInit(): void {

  }
}
