import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserOrderReportComponent } from './components/user-order-report/user-order-report.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';

import { ProductListModalComponent } from './components/product-list/product-list-modal/product-list-modal';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserOrderReportComponent,
    ProductListComponent,
    TopSellingProductsComponent,
    ProductListModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // Time to live in milliseconds
      positionClass: 'toast-top-right', // Poziția implicită în colțul dreapta sus
      closeButton: true, // Afișează buton de închidere
      progressBar: true // Afișează bara de progres
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
