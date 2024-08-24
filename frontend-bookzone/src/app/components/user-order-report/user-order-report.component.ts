import { Component, OnInit } from '@angular/core';
import { UserService, UserOrderReportDto } from '../../services/users/users.service'

@Component({
  selector: 'app-user-order-report',
  templateUrl: './user-order-report.component.html',
  styleUrls: ['./user-order-report.component.scss']
})
export class UserOrderReportComponent implements OnInit {
  userOrderReports: UserOrderReportDto[] = [];
  paginatedUsers: UserOrderReportDto[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: (number | string)[] = [];
  searchQuery: string = ''; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserOrderReports();
  }

  loadUserOrderReports(): void {
    this.userService.getUsersWithOrdersOver1000().subscribe(reports => {
      this.userOrderReports = reports;
      this.totalItems = this.userOrderReports.length;
      this.updatePaginatedUsers();
      this.updatePages();
    });
  }

  updatePaginatedUsers(): void {
    let filteredUsers = this.userOrderReports.filter(user => {
      const query = this.searchQuery.toLowerCase();
      const name = user.name.toLowerCase();
      return name.includes(query);
    });

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = filteredUsers.slice(start, end);

    this.totalItems = filteredUsers.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePages();
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
      this.updatePaginatedUsers();
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
    this.updatePaginatedUsers();
  }
}
