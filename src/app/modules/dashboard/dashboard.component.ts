import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { TrademarksService } from './trademarks/trademarks.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    trademarks: any;

    visible: boolean = false;

    name: string = '';
    code: string = '';
    id: string = '';
    @ViewChild('filter') filter!: ElementRef;

    constructor(private productService: ProductService, public layoutService: LayoutService, private trademarksService: TrademarksService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.getTrademarks();
    }

    getTrademarks() {
        this.trademarksService.getTrademarks().subscribe((data: any) => {
             this.trademarks = data;
             console.log(this.trademarks);
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    showCreateBrandDialog() {
        this.visible = true;
    }

    createBrand() {
        if(!this.id) {
            if(this.name && this.code) {
                this.trademarksService.createTrademark({name: this.name, code: this.code}).subscribe((data: any) => {
                    this.getTrademarks();
                    this.visible = false;
                    this.name = '';
                    this.code = '';
                });
            }
        } else{
            if(this.name && this.code) {
                this.trademarksService.updateTrademark(this.id, {name: this.name, code: this.code}).subscribe((data: any) => {
                    this.getTrademarks();
                    this.visible = false;
                    this.id = '';
                    this.name = '';
                    this.code = '';
                });
            }
        }
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
