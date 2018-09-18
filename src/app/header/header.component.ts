import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  public userIsAuthenticated = false;
  constructor(private authService: AuthService) {}



  ngOnInit() {
    this.userIsAuthenticated = this.authService.authStatus;
    this.authListenerSubs = this.authService._authStatusListener
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
