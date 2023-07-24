import {Component, Inject, Injectable} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { style } from '@angular/animations';

@Component({
    templateUrl:  './customeMatDialog.html',
    styleUrls:['../../assets/styles.css']
})
export  class  customMatDialogComponent {
    inputData;
    constructor(private  dialogRef:  MatDialogRef<customMatDialogComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
      this.inputData = data;
    }
    public  closeMe() {
        this.dialogRef.close();
    }
}