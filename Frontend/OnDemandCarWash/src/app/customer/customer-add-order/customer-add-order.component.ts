import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/model/order';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-add-order',
  templateUrl: './customer-add-order.component.html',
  styleUrls: ['./customer-add-order.component.css']
})
export class CustomerAddOrderComponent implements OnInit {
  orderDetails:  Order = new Order();
  errorMessage: string | undefined;
  customer:any={
    id:'',
    email:'',
    fullName:'',
    phoneNumber:0,
    username:''
  };
  WPList: any;
  sb = faShoppingBasket;
  
  constructor(private service:OrderService, private service1:CustomerService  ,private route:Router, private auth:AuthenticationService){}
  username=this.auth.getUsername()||''
 
  
  ngOnInit(): void {
    this.getCustomerByusername(this.username);
    this.WpView();

  }
  getCustomerByusername(username:any){
    this.service1.getCustomerByUsername(this.username).subscribe((data:any)=>{
      this.customer=data;
      this.orderDetails.username=this.customer[0].username;
      this.orderDetails.phoneNo=this.customer[0].phoneNumber;
      this.orderDetails.useremailid=this.customer[0].email;
    })
  }

  placeOrder(orderDetails:Order)
  {
    this.service.placeOrder(this.orderDetails).subscribe((data)=>{
      console.log(data);
      this.route.navigate(['user/payment',this.orderDetails.washpacks])
      
    })
  }
  WpView()
{
this.service1.WpView().subscribe((data)=>{
  console.log(data);
  this.WPList=data;
})
}

}
