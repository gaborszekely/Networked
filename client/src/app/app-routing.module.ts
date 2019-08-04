import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/home/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./modules/contacts/contacts.module').then(
        mod => mod.ContactsModule
      )
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./modules/events/events.module').then(mod => mod.EventsModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then(mod => mod.UserModule)
  },
  // { path: "**", component: PageNotFoundComponent }
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(mod => mod.HomeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes /*, { enableTracing: true } // <-- for debugging, */
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
