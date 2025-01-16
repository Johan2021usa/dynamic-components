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
  loginState!:any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
  ){
    this.loginState = localStorage.getItem('navBarState');
  }

  ngOnInit(): void {
    this.authService.subjectState.subscribe((state)=>{
      localStorage.setItem('navBarState', String(state));
      this.loginState = localStorage.getItem('navBarState');
    })
  }

  login(){}

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
