import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as ContactsActions from '../../../../actions/contacts.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  confirmed = false;
  user$: Observable<any>;
  loggedIn = false;

  constructor(private router: Router, public store: Store<AppState>) {
    this.user$ = store.select(store => store.user);
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      this.loggedIn = user.loggedIn;
    });
  }

  confirm() {
    this.confirmed = true;
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(new ContactsActions.ClearContacts());
    this.router.navigateByUrl('login');
  }
}
