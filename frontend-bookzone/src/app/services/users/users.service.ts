import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserOrderReportDto {
  id: number;
  name: string;
  totalOrderValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5151/api/users';

  constructor(private http: HttpClient) {}

  getUsersWithOrdersOver1000(): Observable<UserOrderReportDto[]> {
    return this.http.get<UserOrderReportDto[]>(`${this.baseUrl}/high-value-orders`);
  }
}
