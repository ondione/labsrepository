import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/groupe';
import { GroupService } from '../../../services/groupe.services';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { State } from '../../../store_managment/reducers/index';

import { 
  AddGroupAction,
  ListGroupAction
} from '../../../store_managment/actions/groups-action';

import { selectAllGroups } from '../../../store_managment/selectors/groups-selector';

@Component({
  selector: 'app-root',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  groupe : Group = {
    id_group:0,
    nom_group:'',
    libelle:''
  };

  constructor(
    private groupserv : GroupService,
    private route: Router,
    private store: Store<State>

  ) { }

  ngOnInit() {

  }

  saveGroup(f){
    let groupe = <Group> f.value;
    this.store.dispatch( new AddGroupAction({Group:groupe})); 
    this.store.select(selectAllGroups).subscribe( response => {

      console.log(response , "add grp  response ")
      if(response && response != null){
        this.route.navigate(['/groupes']);
      }
    });
    
    /*this.groupserv.addGroup(groupe).subscribe( resp =>{
      if(resp && resp["reponse"] == "OK"){
        this.route.navigate(['/groupes']);
      }
    });*/
  }
}
