import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';
import { UserOrderReportComponent } from './components/user-order-report/user-order-report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'top-selling-products', component: TopSellingProductsComponent },
  { path: 'user-order-report', component: UserOrderReportComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
