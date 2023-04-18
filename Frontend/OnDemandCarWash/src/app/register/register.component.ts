import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  //Icons
  faReg = faAddressBook;
  errorMessage: string = '';
  ngOnInit(): void {
   
  }
  //user:User=new User();
  roles = ['washer','user'];
  user: any={
    id:'',
    email:'',
    password:'',
    confrimpassword:'',
    fullName:'',
    phoneNumber:'',
    roles:[''],
    username:''    
  };
  validateRole(value:string){
    if(value==='washer'){
      this.user.roles=['washer'];
      console.log(this.user.roles)
    }
    else{
      this.user.roles=['user']
      console.log(this.user.roles)
    }
  }
  
  register() {
    this.authenticationService.signup(this.user).subscribe(
      (data: any) => {
        console.log(this.user.roles)
        console.log(data);
        Swal.fire({
          title: 'Registeration Successful',
          icon: 'success',
        });
        this.router.navigate(['/login']);
      },
      (err: { status: number; errorMessage: string; }) => {
        if (err?.status === 400) {
          this.errorMessage = 'User Exists Already';
        } else {
          this.errorMessage =
            'Unexpected error occurred. Error is: ' + err?.errorMessage;
          console.log(err);
        }
      }
    );
  }
}