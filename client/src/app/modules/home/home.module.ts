import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FaqComponent } from './components/faq/faq.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [FaqComponent, PageNotFoundComponent],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
