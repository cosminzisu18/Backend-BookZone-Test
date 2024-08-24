import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductListModalComponent } from './product-list-modal/product-list-modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: (number | string)[] = [];
  sortColumn: keyof Product = 'id'; 
  sortDirection: 'asc' | 'desc' = 'asc'; 
  searchQueries: { [key: string]: string } = {};

  constructor(private productService: ProductService, private modal: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updatePaginatedProducts();
      this.updatePages();
    });
  }

  updatePaginatedProducts(): void {
    let filteredProducts = this.products.filter(product => {
      return Object.keys(this.searchQueries).every(key => {
        const query = this.searchQueries[key]?.toLowerCase() || '';
        const value = String(product[key as keyof Product]).toLowerCase();
        return value.includes(query);
      });
    });

    if (this.sortColumn) {
      filteredProducts.sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return 0;
      });
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = filteredProducts.slice(start, end);
  }

  updatePages(): void {
    const maxPagesToShow = 3;
    this.pages = [];

    if (this.totalPages <= maxPagesToShow) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      const startPage = Math.max(1, this.currentPage - 1);
      const endPage = Math.min(this.totalPages, this.currentPage + 1);

      if (startPage > 1) {
        this.pages.push(1);
        if (startPage > 2) {
          this.pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }

      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
          this.pages.push('...');
        }
        this.pages.push(this.totalPages);
      }
    }
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return;
      this.currentPage = page;
      this.updatePaginatedProducts();
      this.updatePages();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  sort(column: keyof Product): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updatePaginatedProducts();
  }

  onSearch(): void {
    this.currentPage = 1; 
    this.updatePaginatedProducts();
    this.updatePages();
  }

  productAddEdit(id_product?: number) { 
    const modalRef = this.modal.open(ProductListModalComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_product = id_product;
    modalRef.closed.subscribe(() => this.loadProducts());
  }

  deleteProduct(product: any): void {
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });

    modalRef.componentInstance.title = `Product Deletion`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Do you want to delete product <b>${product.name}</b>?</p>`;

    modalRef.closed.subscribe((confirmed: boolean) => {
      if (confirmed) { 
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.loadProducts(); 
          this.toastr.warning('The product has been deleted', 'Warning');
        });
      }
    });
  }
}
