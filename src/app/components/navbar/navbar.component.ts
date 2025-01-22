import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  title = 'Dynamic Components';
  loginState:any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
  ){
    this.loginState = localStorage.getItem('navBarState'); // By default local storage will be null, so that we must set it as null each time the component is loaded, that is the reason of line 23, Otherwise, the login button won't appear the first time a person gets in the website.
    if(this.loginState===null){
      this.loginState = "false";
    }
  }

  ngOnInit(): void {
    this.authService.subjectState.subscribe((state)=>{
      localStorage.setItem('navBarState', String(state));
      this.loginState = localStorage.getItem('navBarState');
    })
  }

  logOut(){
    this.router.navigate(['/login']);
    this.authService.logOut().then(()=>{});

    localStorage.setItem('navBarState', 'false');
    this.loginState = localStorage.getItem('navBarState');
  }

  redirectLogin(){
    this.authService.isLoggedOut().then((state)=>{
      if(state){
        this.zone.run(()=>{
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
