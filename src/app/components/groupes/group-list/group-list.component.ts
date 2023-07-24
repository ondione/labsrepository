import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Group } from '../../../models/groupe';
import { GroupService } from '../../../services/groupe.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  listeGroup;

  constructor(private groupserv : GroupService, private route: Router, private changedetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.groupserv.getListGroups().subscribe( resp =>{
      if(resp && resp["allgroup"] ){
           console.log(resp["allcontact"] ," resp group")
            this.listeGroup = resp["allgroup"];
            this.changedetectorRef.detectChanges();
      }
    })
  }

  deleteGroup(group){ 
    this.groupserv.deleteGroup(group).subscribe( resp =>{
      if(resp && resp["status"]=="success" ){
          this.ngOnInit();
      }
    })
  }
}
