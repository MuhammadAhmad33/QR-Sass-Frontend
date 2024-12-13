import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any;

  visible: boolean = false;

  name: string = '';
  email: string = '';
  password: string = '';
  id: string = '';

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
    /* this.usersService.createUser({ name: 'Pere Doe', email: 'pere@pere.com', password: '123456' }).subscribe((data: any) => {
         console.log(data);
    }); */
  }

  getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
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

  createUser() {
    if(!this.id) {
      if(this.name && this.email && this.password) {
          this.usersService.createUser({name: this.name, email: this.email, password: this.password}).subscribe((data: any) => {
              this.clearForm();
          });
      }
    } else{
      /* if(this.name && this.code) {
          this.trademarksService.updateTrademark(this.id, {name: this.name, code: this.code}).subscribe((data: any) => {
              this.clearForm();
          });
      } */
    }
  }

  clearForm() {
    this.getUsers();
    this.visible = false;
    this.id = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }

  showCreateUserDialog() {
    this.visible = true;
  }

}
