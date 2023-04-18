import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../service/authentication.service';
import { StorageServiceService } from '../service/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service:AuthenticationService, private storageservice:StorageServiceService, private route:Router, private router: ActivatedRoute,private location:Location){

  }
  faReg = faAddressBook;
user:any={
username:'',
password:''
}
isLoginFailed=false;
isLoggedIn=false; 
roles:string='';
username: string = '';
errorMessage: string = '';

ngOnInit(): void {
  // if(this.storageservice.getToken()){
    
  //   this.isLoggedIn=true;
  //   this.roles=this.storageservice.getUser().roles;
  //   console.log(this.roles);
  // }
  
}

login(){
  this.service.signin(this.user).subscribe((data:any)=>{
    this.storageservice.saveToken(data.accessToken);
    this.storageservice.saveUser(data);
    window.sessionStorage.setItem('username', this.user.username); 
   
    this.isLoginFailed=false;
    this.isLoggedIn=true; 

    console.log(data);
  this.roles=this.storageservice.getUser().roles[0];
  console.log(this.roles);
  if(this.roles==='ROLE_WASHER'){
  this.route.navigate(['/washer/washview']);
  }
  else if(this.roles==='ROLE_ADMIN'){
    this.route.navigate(['/admin/homeview']);
  }
  else if(this.roles==='ROLE_USER'){
    this.route.navigate(['/user/homeview']);
  }
  Swal.fire({ title: 'Welcome to GreenCarWash', 
        text: this.user.username, imageUrl: "../../../../assets/images/car-wash.jpg", 
        imageWidth: 400, 
        imageHeight: 200, 
        imageAlt: 'Custom image', 
        showConfirmButton: true, 
        timer: 6500 
      })
      
      
    },
    (err: { status: number; errorMessage: string; }) => {
      if (err?.status === 401) {
        this.errorMessage = 'Invalid Credentials';
      } else {
        this.errorMessage =
          'Unexpected error occurred. Error is: ' + err?.errorMessage;
        console.log(err);
      }
    }
   
    )
  }


  
  
  
    
back(){
  this.location.back();
}


}
