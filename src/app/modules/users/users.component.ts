import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/service/auth/auth.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.comapanies().subscribe((data: any) => {
         this.users = data;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  
  getColspan() {
    return 4;
  }

}
