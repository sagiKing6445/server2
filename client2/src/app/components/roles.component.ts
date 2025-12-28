import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService, Role } from '../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  newRole: Role = { name: '' };
  selectedRole: Role | null = null;
  editingRole: Role | null = null;
  showForm = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      }
    });
  }

  openForm(role?: Role): void {
    if (role) {
      this.editingRole = { ...role };
      this.newRole = { ...role };
    } else {
      this.editingRole = null;
      this.newRole = { name: '' };
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newRole = { name: '' };
    this.editingRole = null;
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Auto-dismiss after 3 seconds
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // Auto-dismiss after 5 seconds
  }

  saveRole(): void {
    if (this.editingRole) {
      // Update
      this.roleService.updateRole(this.editingRole.id!, this.newRole).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאה עודכנה בהצלחה!');
          if (response.roles) {
            this.roles = response.roles;
          } else {
            this.loadRoles();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating role:', error);
          this.showError('שגיאה בעדכון הרשאה. אנא נסה שוב.');
        }
      });
    } else {
      // Create
      this.roleService.createRole(this.newRole).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאה חדשה נוספה בהצלחה!');
          if (response.roles) {
            this.roles = response.roles;
          } else {
            this.loadRoles();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error creating role:', error);
          this.showError('שגיאה ביצירת הרשאה חדשה. אנא נסה שוב.');
        }
      });
    }
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
  }

  editRole(role: Role): void {
    this.openForm(role);
  }

  deleteRole(id: number | undefined): void {
    if (id && confirm('האם אתה בטוח שברצונך למחוק הרשאה זו?')) {
      this.roleService.deleteRole(id).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאה נמחקה בהצלחה!');
          if (response.roles) {
            this.roles = response.roles;
          } else {
            this.loadRoles();
          }
          if (this.selectedRole?.id === id) {
            this.selectedRole = null;
          }
        },
        error: (error) => {
          console.error('Error deleting role:', error);
          this.showError('שגיאה במחיקת הרשאה. אנא נסה שוב.');
        }
      });
    }
  }
}

