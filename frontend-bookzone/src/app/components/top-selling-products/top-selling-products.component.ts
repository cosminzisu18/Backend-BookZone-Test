import { Component, OnInit } from '@angular/core';
import { ProductService, TopSellingProductDto } from '../../services/product/product.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss']
})
export class TopSellingProductsComponent implements OnInit {
  topSellingProducts: TopSellingProductDto[] = [];
  paginatedProducts: TopSellingProductDto[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: (number | string)[] = [];
  searchQueries: { [key: string]: string } = {};
  globalSearchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadTopSellingProducts();
  }

  loadTopSellingProducts(): void {
    this.productService.getTopSellingProducts().subscribe(products => {
      this.topSellingProducts = products;
      this.totalItems = this.topSellingProducts.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updatePaginatedProducts();
      this.updatePages();
    });
  }

  updatePaginatedProducts(): void {
    let filteredProducts = this.topSellingProducts.filter(product => {
      return Object.keys(this.searchQueries).every(key => {
        const query = this.searchQueries[key]?.toLowerCase() || '';
        const value = String(product[key as keyof TopSellingProductDto]).toLowerCase();
        return value.includes(query);
      });
    });

    if (this.globalSearchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        Object.values(product).some(val =>
          String(val).toLowerCase().includes(this.globalSearchQuery.toLowerCase())
        )
      );
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

  onSearch(): void {
    this.currentPage = 1; 
    this.updatePaginatedProducts();
    this.updatePages();
  }
}
