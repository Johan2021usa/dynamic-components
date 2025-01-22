import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Observable, Observer, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  loginState: any;
  subjectState = new Subject<boolean>();
  // npm install @supabase/supabase-js // supabase library npm
  private supabase: SupabaseClient;

  constructor(
  ) {
      this.supabase = createClient(
      environment.SUPABASE_URL as any,
      environment.SUPABASE_KEY as any
    );
  }

  /**
   * Pending documentation to implement id saved in localStorage.
   * https://supabase.com/docs/reference/javascript/auth-getuser
   * https://supabase.com/docs/reference/javascript/auth-onauthstatechange
   *
   */

  async signUp(dataUser:any){
    let { data, error } = await this.supabase.auth.signUp(dataUser);
    return {data, error}
  }

  async login(dataUser:any){
    const { data, error } = await this.supabase.auth.signInWithPassword(dataUser);
    return{ data, error}
  }

  isLoggedIn(){
    return new Promise<boolean>((resolve) => {
      this.supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session === null && event === 'INITIAL_SESSION') {
            resolve(false); // Not logged in
          } else if (session !== null && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
            resolve(true); // Logged in
          } else if (event === 'SIGNED_IN') {
            resolve(true); // Logged in completely
          }else {
            resolve(false); // Default fallback
          }
        }
      );
    });
  }

  isLoggedOut(){
    return new Promise<boolean>((resolve) => {
        this.supabase.auth.onAuthStateChange((event, session)=>{
          if(session===null && event==='INITIAL_SESSION'){
            resolve(true); // the user is loggedOut
          }
        })
    });
  }

  async logOut(){
    let { error } = await this.supabase.auth.signOut();
    return error;
  }

  observerSate(state:boolean){
    this.subjectState.next(state);
  }




  // async getUser(){
  //   let userInfo;
  //   const jwt:any = localStorage.getItem("oauth_provider_token");
  //   if(localStorage.getItem("oauth_provider_token")){
  //     const { data: { user } } = await this.supabase.auth.getUser(jwt);
  //     userInfo = user;
  //   }
  //   return userInfo;
  // }

}
