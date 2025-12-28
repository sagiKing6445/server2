import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRole {
  id?: number;
  user_id: number;
  role_id: number;
  username?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private apiUrl = 'http://localhost:3000/user-roles';

  constructor(private http: HttpClient) { }

  getAllUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.apiUrl);
  }

  getUserRoleById(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.apiUrl}/${id}`);
  }

  assignRole(userRole: UserRole): Observable<any> {
    return this.http.post(this.apiUrl, userRole);
  }

  updateUserRole(id: number, userRole: UserRole): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userRole);
  }

  deleteUserRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

