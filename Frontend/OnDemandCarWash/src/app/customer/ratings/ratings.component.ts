import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/service/order.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  user=faUser;
  orderId:any;
  Ratings:any={
   washerName:'',
   comments:'',  
   rating:0
  };
  constructor(private service:CustomerService, private router:Router, private route:ActivatedRoute, private order:OrderService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=> {let orderId = (param.get('orderId'))
    this.getByorderId(orderId);
  });
  }
  addCustomerRating(Ratings:any){
   this.service.addCustomerRatings(this.Ratings).subscribe((data)=>{
    this.Ratings=data;
    this.router.navigate(['user']);
   })
  }
  getByorderId(orderId:any){
  this.order.getOrderById(orderId).subscribe((data)=>{
        this.Ratings=data
  })
  }

}
