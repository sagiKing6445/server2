import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoleService, UserRole } from '../services/user-role.service';
import { UserService, User } from '../services/user.service';
import { RoleService, Role } from '../services/role.service';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  userRoles: UserRole[] = [];
  users: User[] = [];
  roles: Role[] = [];
  newUserRole: UserRole = { user_id: 0, role_id: 0 };
  selectedUserRole: UserRole | null = null;
  editingUserRole: UserRole | null = null;
  showForm = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private userRoleService: UserRoleService,
    private userService: UserService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.loadUserRoles();
    this.loadUsers();
    this.loadRoles();
  }

  loadUserRoles(): void {
    this.userRoleService.getAllUserRoles().subscribe({
      next: (data) => {
        this.userRoles = data;
      },
      error: (error) => {
        console.error('Error loading user roles:', error);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
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

  openForm(userRole?: UserRole): void {
    if (userRole) {
      this.editingUserRole = { ...userRole };
      this.newUserRole = { ...userRole };
    } else {
      this.editingUserRole = null;
      this.newUserRole = { user_id: 0, role_id: 0 };
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newUserRole = { user_id: 0, role_id: 0 };
    this.editingUserRole = null;
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

  saveUserRole(): void {
    if (!this.newUserRole.user_id || !this.newUserRole.role_id) {
      this.showError('אנא בחר משתמש והרשאה');
      return;
    }

    if (this.editingUserRole) {
      // Update
      this.userRoleService.updateUserRole(this.editingUserRole.id!, this.newUserRole).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאת משתמש עודכנה בהצלחה!');
          if (response.userRoles) {
            this.userRoles = response.userRoles;
          } else {
            this.loadUserRoles();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating user role:', error);
          this.showError('שגיאה בעדכון הרשאת משתמש. אנא נסה שוב.');
        }
      });
    } else {
      // Create
      this.userRoleService.assignRole(this.newUserRole).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאה הוקצתה בהצלחה!');
          if (response.userRoles) {
            this.userRoles = response.userRoles;
          } else {
            this.loadUserRoles();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error assigning role:', error);
          this.showError('שגיאה בהקצאת הרשאה. אנא נסה שוב.');
        }
      });
    }
  }

  selectUserRole(userRole: UserRole): void {
    this.selectedUserRole = userRole;
  }

  editUserRole(userRole: UserRole): void {
    this.openForm(userRole);
  }

  deleteUserRole(id: number | undefined): void {
    if (id && confirm('האם אתה בטוח שברצונך להסיר הרשאה זו?')) {
      this.userRoleService.deleteUserRole(id).subscribe({
        next: (response: any) => {
          this.showSuccess('הרשאה הוסרה בהצלחה!');
          if (response.userRoles) {
            this.userRoles = response.userRoles;
          } else {
            this.loadUserRoles();
          }
          if (this.selectedUserRole?.id === id) {
            this.selectedUserRole = null;
          }
        },
        error: (error) => {
          console.error('Error deleting user role:', error);
          this.showError('שגיאה בהסרת הרשאה. אנא נסה שוב.');
        }
      });
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown';
  }
}

