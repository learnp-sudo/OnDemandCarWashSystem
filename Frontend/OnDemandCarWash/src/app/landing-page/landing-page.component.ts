import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }
regis() {
    this.router.navigateByUrl('/register');
  };
}
