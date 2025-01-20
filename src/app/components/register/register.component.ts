import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss'
  // styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
   @ViewChild('message') message!:ElementRef;
    myForm :any;
    redirect:boolean = false;

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
        'password' : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]) // For regex we must use /kkkk/ slash characters to englobe the regex...
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
        await this.authService.signUp(this.myForm.value)
        .then((res:any)=>{
          const user = res.data.user;
          const {user_metadata:{email_verified}} = user;

          if(user.role==="authenticated" && email_verified===false){
            // Logic your the user to know he has to verify his account in  his email.
            console.log("pending verifying the email account");
            this.redirect=true;
            this.toggleDialog(true);
          }
        })
        // .then(()=> {
        //   this.router.navigate(['/login']);
        //   this.myForm.reset();
        // });
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
        if(this.redirect){
          this.router.navigate(['/login']);
        }
      }
    }

}
