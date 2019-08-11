import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as ContactsActions from '../../../../actions/contacts.actions';
import { Observable } from 'rxjs';
import { isLoggedInSelector, userSelector } from 'src/app/core/store/selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>;
  loggedIn$: Observable<boolean>;
  confirmed = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.loggedIn$ = store.select(isLoggedInSelector);
    this.user$ = store.select(userSelector);
  }

  ngOnInit() {}

  confirm() {
    this.confirmed = true;
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(new ContactsActions.ClearContacts());
    this.router.navigateByUrl('login');
  }
}
