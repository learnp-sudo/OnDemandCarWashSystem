import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCar, faCopyright, faHandsWash, faWandSparkles, faWater, faWaterLadder } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './service/authentication.service';
import { StorageServiceService } from './service/storage-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles:string[];
  isLoggedIn=false;
  showAdminBoard=false;
  showWasherBoard=false;
  username:string;
  customer:any;
  carIcon = faCar;
  icon = faWater;
  copyright= faCopyright;
  title = 'OnDemandCarWash';
  constructor(private router: Router, public _authService: AuthenticationService, private storageService:StorageServiceService) { 

  }
  
//username = this._authService.getUsername()
aboutus = () => {
  this.router.navigateByUrl('/aboutus');
};
contactinfo = () => {
  this.router.navigateByUrl('/contactinfo');
};
  
    
ngOnInit(): void {
 
} 

}

