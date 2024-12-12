import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrademarksService } from './trademarks/trademarks.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    trademarks: any;
    visible: boolean = false;
    name: string = '';
    code: string = '';
    id: string = '';

    @ViewChild('filter') filter!: ElementRef;

    constructor(private trademarksService: TrademarksService) { }

    ngOnInit() {
        this.getTrademarks();
    }

    getTrademarks() {
        this.trademarksService.getTrademarks().subscribe((data: any) => {
             this.trademarks = data;
        });
    }

    showCreateBrandDialog() {
        this.visible = true;
    }

    createBrand() {
        if(!this.id) {
            if(this.name && this.code) {
                this.trademarksService.createTrademark({name: this.name, code: this.code}).subscribe((data: any) => {
                    this.clearForm();
                });
            }
        } else{
            if(this.name && this.code) {
                this.trademarksService.updateTrademark(this.id, {name: this.name, code: this.code}).subscribe((data: any) => {
                    this.clearForm();
                });
            }
        }
    }

    clearForm() {
        this.getTrademarks();
        this.visible = false;
        this.id = '';
        this.name = '';
        this.code = '';
    }

    editBrand(id: string) {
        this.trademarksService.getTrademark(id).subscribe((data: any) => {
            this.name = data.name;
            this.code = data.code;
            this.id = id;
            this.visible = true;
        });
    }

    deleteBrand(id: number) {
        this.trademarksService.deleteTrademark(id).subscribe((data: any) => {
            this.getTrademarks();
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
        return (this.trademarks.length > 0) ? 4 : 4;
    }
}
