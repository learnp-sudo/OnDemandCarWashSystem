import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-customer-dash-board',
  templateUrl: './customer-dash-board.component.html',
  styleUrls: ['./customer-dash-board.component.css']
})
export class CustomerDashBoardComponent implements OnInit {
  username: string = '';
  constructor(private router: ActivatedRoute, private authService: AuthenticationService) { } 
  private unsubscriber: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    history.pushState(null, '', location.href); fromEvent(window, 'popstate').pipe(takeUntil(this.unsubscriber)).subscribe((_) => { history.pushState(null, ''); });
  }
 
      

}
