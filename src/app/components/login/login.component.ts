import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, NgZone, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  @ViewChild('message') message!:ElementRef;
  myForm :any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ){
    this.redirectLogin();
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', Validators.required) //
    });
  }

  async confirm(){
    if(this.myForm.invalid){
      this.toggleDialog(true);
      // Object.values(this.myForm.controls).forEach((input:any) => {
      //   console.log(this.myForm.controls.email?.['errors']);
      //   console.log(this.myForm.controls.password?.['errors']);
      // });
    }else{
      // console.log(this.myForm.value);
      const login:any = await this.authService.login(this.myForm.value);
      this.redirectLogin();
      this.myForm.reset();
    }
  }

  redirectLogin(){
    this.authService.isLoggedIn().then((state)=>{
      if(state){
        this.authService.observerSate(true);
        this.zone.run(()=>{
          this.router.navigate(['/showcase']);
        });
      }
    });
  }

  toggleDialog(active:boolean){
    if(active){
      this.message.nativeElement.showModal();
    }else{
      this.message.nativeElement.close();
    }
  }
}
