import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductServices } from '../../../../services/products.service';
import { Produits } from '../../../../models/produits';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with selection
 */
@Component({
    selector: 'app-root',
    templateUrl:'./list.component.html',
    styles:['./list.component.css'],
    providers:[ProductServices]
})
export class ListProduitWsComponent implements OnInit {

    displayedColumns: string[] = ['select', 'position', 'ref', 'categorie', 'PU', 'nom','libelle','nbre'];
    dataSource;
    selection = new SelectionModel<Produits>(true, []);
    listProduit ;
    page = 0;
    itemPerPage = 5;
    collectionsize = 0;
    maxsize = 2 ;
    pagesize = 5 ;
    prodList;
    datasourcelength = 0;       

    @ViewChild(MatPaginator, { read:'', static:true}) paginator: MatPaginator;
    @ViewChild(MatSort , { read:'', static:true}) sort: MatSort;
    constructor(private prodservice:ProductServices){}

    ngOnInit(){
        this.retrieveListProduit(); 
    }

    ngAfterViewInit(){

       // this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
       
        this.paginator.page.subscribe( r => {
            this.itemPerPage = r.pageSize;
            this.page = r.pageIndex;
            this.pageChange(this.page);
        });
    }

    retrieveListProduit(){
        this.prodservice.getAllProductsWs().subscribe( prod => {
            this.listProduit = prod;
            this.collectionsize = prod.length;
            this.datasourcelength = prod.length;  
            this.dataSource = new MatTableDataSource<Produits>(prod.slice(0, this.itemPerPage));
        });
    }

    _changePageSize(pagesize){
        this.paginator.page.subscribe( r => {
            this.itemPerPage = r.pageSize;
            this.page = r.pageIndex;
            this.pageChange(this.page);
        });
    }

    pageChange(page:number){
        this.page = page;
        let start = (page) * this.itemPerPage ;
        let end = (page + 1 ) * this.itemPerPage;
        this.collectionsize = this.listProduit.length;
        this.dataSource = new MatTableDataSource<Produits>(this.listProduit.slice(start, end));
    }

  /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
}