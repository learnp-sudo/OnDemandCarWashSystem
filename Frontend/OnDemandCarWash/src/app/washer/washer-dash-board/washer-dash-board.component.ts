import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-washer-dash-board',
  templateUrl: './washer-dash-board.component.html',
  styleUrls: ['./washer-dash-board.component.css']
})
export class WasherDashBoardComponent implements OnInit {
  private unsubscriber: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    history.pushState(null, '', location.href); fromEvent(window, 'popstate').pipe(takeUntil(this.unsubscriber)).subscribe((_) => { history.pushState(null, ''); });
  }
}
