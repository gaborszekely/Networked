import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from "./store/reducers"; 
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
