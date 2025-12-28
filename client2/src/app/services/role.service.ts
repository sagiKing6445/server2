import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// הגדרת המבנה של Role
export interface Role {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) { }

  // שליפת כל התפקידים
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // שליפת תפקיד לפי מזהה
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  // יצירת תפקיד חדש
  createRole(role: Role): Observable<any> {
    return this.http.post(this.apiUrl, role);
  }

  // עדכון תפקיד קיים
  updateRole(id: number, role: Role): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, role);
  }

  // מחיקת תפקיד
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
