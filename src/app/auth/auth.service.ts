import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from './role.enum';
import {catchError, map} from 'rxjs/operators';

import decode from 'jwt-decode';
import { transformError } from '../common/common';
import { CacheService } from './cache.service';

//this decorator marks the authservice class as a participant of the 
//dependency injection system
@Injectable({
  //provided at root level, then angular creates a single, shared 
  //instance of authservice and injects into any class that asks 
  //for it.
  providedIn: 'root'
})
export class AuthService extends CacheService {

  private readonly authProvider: (email: string, password: string) => Observable<IServerAuthResponse>;

  //initialized with local value of authStatus or default, such as
  //when an observer subscribes to this, it will receive that value
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);

  constructor(private httpClient : HttpClient) { 
    super();
    //setting next handler for authStatus (remember that this
    //has behavior as observable as well as observer)
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus', authStatus);
    });
    this.authProvider = this.userAuthProvider;
  }

  private userAuthProvider( email: string, password: string) : Observable<IServerAuthResponse>{
    //fetching token info (including access_token) from api
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlService}/token`, {email:email, password: password});
  }

  login(email: string, password: string): Observable<IAuthStatus>{
    this.logout();
    //call userAuthProvider fetching token from api 
    //converting it to observable
    const loginResponse = this.authProvider(email, password).pipe(
      map(value => {
        //saving token string into localstorage
        this.setToken(value.access_Token);
        //obtaining data from token such as name and user role
        const result = decode(value.access_Token);
        return result as IAuthStatus;
      }),
      catchError(transformError)
    );

    //execute the observable to return another one (of type 
    //behavior subject) this permits access the current value to 
    //anyone who subscribe to it
    loginResponse.subscribe(
      //predefined observer that sets functions for next and error,
      //they are handlers
      //for notifications received from observable loginResponse
      res => {
        //next represents actual data being delivered to an observer
        //whose data is res
        //calling next handler on authstatus (setted on at
        //calling constructor) and passing res data
        //this one save res on cache
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      }
    );

    return loginResponse;
  }

  logout(){
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  getToken(): string{
    return this.getItem('jwt') || '';
  }

  private clearToken(){
    this.removeItem('jwt');
  }

  getAuthStatus(): IAuthStatus{
    return this.getItem('authStatus');
  }
}

export interface IAuthStatus {
  role: Role;
  primarysid : null|number;
  unique_name: null|string;
}

interface IServerAuthResponse{
  access_Token: string;
}

const defaultAuthStatus: IAuthStatus = { role: Role.None, primarysid: null, unique_name: null};