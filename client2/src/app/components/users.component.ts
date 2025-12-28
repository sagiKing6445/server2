import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', email: '' };
  selectedUser: User | null = null;
  editingUser: User | null = null;
  showForm = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
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

  openForm(user?: User): void {
    if (user) {
      this.editingUser = { ...user };
      this.newUser = { ...user };
    } else {
      this.editingUser = null;
      this.newUser = { username: '', email: '' };
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newUser = { username: '', email: '' };
    this.editingUser = null;
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

  saveUser(): void {
    if (this.editingUser) {
      // Update
      this.userService.updateUser(this.editingUser.id!, this.newUser).subscribe({
        next: (response: any) => {
          this.showSuccess('משתמש עודכן בהצלחה!');
          if (response.users) {
            this.users = response.users;
          } else {
            this.loadUsers();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.showError('שגיאה בעדכון המשתמש. אנא נסה שוב.');
        }
      });
    } else {
      // Create
      this.userService.createUser(this.newUser).subscribe({
        next: (response: any) => {
          this.showSuccess('משתמש חדש נוסף בהצלחה!');
          if (response.users) {
            this.users = response.users;
          } else {
            this.loadUsers();
          }
          this.closeForm();
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.showError('שגיאה ביצירת משתמש חדש. אנא נסה שוב.');
        }
      });
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  editUser(user: User): void {
    this.openForm(user);
  }

  deleteUser(id: number | undefined): void {
    if (id && confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          this.showSuccess('משתמש נמחק בהצלחה!');
          if (response.users) {
            this.users = response.users;
          } else {
            this.loadUsers();
          }
          if (this.selectedUser?.id === id) {
            this.selectedUser = null;
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showError('שגיאה במחיקת המשתמש. אנא נסה שוב.');
        }
      });
    }
  }
}

