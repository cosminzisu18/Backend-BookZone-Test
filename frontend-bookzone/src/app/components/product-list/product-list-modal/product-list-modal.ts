import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService, Product } from '../../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list-modal',
  templateUrl: './product-list-modal.component.html',
  styleUrls: ['./product-list-modal.component.scss']
})
export class ProductListModalComponent implements OnInit {
  @Input() id_product?: number;
  product: Product = { id: 0, name: '', price: 0 };
  isEditMode: boolean = false;

  constructor(public activeModal: NgbActiveModal,private productService: ProductService,private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.id_product) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    if (this.id_product) {
      this.productService.getProductById(this.id_product).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.editProduct(this.product).subscribe(() => {
        this.activeModal.close();
        this.toastr.success('The product has been updated', 'Success');
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.activeModal.close();
        this.toastr.success('The product has been added', 'Success');

      });
    }
  }
}
