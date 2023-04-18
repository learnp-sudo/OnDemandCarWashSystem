import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';

import { AuthenticationService} from './service/authentication.service'
import { StorageServiceService } from './service/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor (private _authService:AuthenticationService,private storageservice:StorageServiceService, private _router:Router){}

 canActivate(): boolean{
  
  if(this._authService.loggedIn()){
    return true
  }

  else{
    this._router.navigate(['login'])
    return false
  }

  }
 }


