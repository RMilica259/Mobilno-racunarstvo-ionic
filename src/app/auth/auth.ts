import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.model';
import { tap, map } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
  }
    
  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if(user) {
          return ! !user.token;
        } else {
          return false;
        }     
      })
    ); 
  }

  register(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
      {email: user.email, password: user.password, returnSecureToken: true})
      .pipe(
        tap((userData: AuthResponseData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  logIn(user: UserData){
    this._isUserAuthenticated = true;
     return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
      {email: user.email, password: user.password, returnSecureToken: true})
      .pipe(
        tap((userData: AuthResponseData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  logOut(){
    this._user.next(null);
  }
}
