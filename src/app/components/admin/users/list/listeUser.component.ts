import { Component, ViewChild,OnChanges,AfterViewInit,OnInit } from '@angular/core';
import { AuthentificationService } from '../../../../services/users.services';
import { AppSettingService } from '../../../../services/appService';
import { User } from '../../../../models/user';
import { MatPaginator, MatSort, MatTableDataSource , PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-root',
    templateUrl:'./listeUser.component.html',
    styles:[` a{
        underline:none;
    }`],
    providers:[AuthentificationService]
})

export class ListeUserComponent implements OnInit, AfterViewInit {

    listeUser;
    page = 1;
    itemPerPage = 5;
    collectionsize = 0;
    maxsize = 2 ;
    pagesize = 5 ;
    usrList;

    displayedColumns: string[] = ['select', 'position', 'firstname', 'lastname', 'login', 'telephone','adresse', 'role','actif_inactif'];
    dataSource;
    selection = new SelectionModel<User>(true,[]);

    datasourcelength = 0; 
    @ViewChild(MatPaginator, { read:'', static:true}) paginator: MatPaginator;
    @ViewChild(MatSort , { read:'', static:true}) sort: MatSort;

    constructor(private userservice:AuthentificationService){}

    ngOnInit(){
        this.retrieveListUser(); 
    }

    _changePageSize(pagesize){
        this.paginator.page.subscribe( r=> {
            this.itemPerPage = r.pageSize;
            this.page = r.pageIndex;
            //console.log(r," pagination page index");
        });
    }
    
    ngAfterViewInit(){
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.paginator.page.subscribe( r=> {
            //console.log(r," pagination page index");
            this.itemPerPage = r.pageSize;
            this.page = r.pageIndex;

            this.pageChange(this.page);
        });
    }

    retrieveListUser(){
        this.userservice.getAllUsers().subscribe( users => {
            this.listeUser = users;
            this.collectionsize = users.length;
            this.datasourcelength = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage) : 1;
            this.dataSource = new MatTableDataSource<User>(users);
        });
    }

    pageChange(page){
        this.page = page;
        let start = (page) * this.itemPerPage ;
        let end = (page + 1 ) * this.itemPerPage;
        this.usrList = null;

        this.collectionsize = this.listeUser.length;
        this.datasourcelength = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage) : 1;
        this.dataSource = new MatTableDataSource<User>(this.listeUser.slice(start, end));
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