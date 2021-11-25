import { Injectable } from '@angular/core';
import { globalVariables } from '../constants/globalVariables';
@Injectable({
  providedIn: 'root'
})
export class WebStorageService{
  private cookieKey = "AUTH_TOKEN_KEY";
  private cookieValue = "AUTH_TOKEN_VALUE";
  private tokenKey = 'AuthToken'

  constructor() {}

  signOut() {
    this.removeCookie();
    this.removeUserData();
  }

  setCookie() {
    document.cookie = this.cookieKey + "=" + this.cookieValue + ";path=/";
  }
  removeCookie() {
    document.cookie = this.cookieKey + "=; expires=Thu, 01 JAN 1970 12:00:00 UTC; path=/";
  }

  getCookie() {
    if (this.getToken() == "") {
      return "";
    }
    var name = this.cookieKey + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public saveToken(token: string) {
    window.localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string {
    if (window.localStorage.getItem(this.tokenKey)) {
      return window.localStorage.getItem(this.tokenKey);
    }
    else return "";
  }

  public saveUser(user) {
    globalVariables.userInfo = user;
    const sessionNo = parseInt(user.user_NO) + Date.now();
    window.localStorage.setItem('SESSION_NO', sessionNo.toString());
    window.localStorage.setItem('USER_NAME', user.user_NAME);
    window.localStorage.setItem('USER_NO', user.user_NO.toString());
  }



  public setItem(key, param){
    window.localStorage.setItem(key, JSON.stringify(param))
  }
  
  public getItem(key):any{    
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    }
    else return '';
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  }


  // public static setUserGloablData() {
  //   globalVariables.userInfo = JSON.parse(window.localStorage.getItem('user'));    
  // }

  public removeUserData() {
    window.localStorage.clear();
  }

  public getSesionNo() {
    return localStorage.SESSION_NO;
  }

}
