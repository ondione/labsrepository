
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';
import { Group } from '../../models/groupe' ;
import { GroupActionTypes , GroupActions } from '../actions/groups-action';

export interface GroupState extends EntityState<Group> {
    allGroupsLoaded:boolean;
    selectedGrouptId:number;
}

export const adapter : EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialGroupState: GroupState = adapter.getInitialState({
    allGroupsLoaded: false,
    selectedGrouptId: null
});

export function GroupReducer(state = initialGroupState , action: GroupActions): GroupState {

    switch(action.type) {

        case GroupActionTypes.AddGroupAction:
            return adapter.addOne(action.payload.Group, state);

        case GroupActionTypes.UpdateGroupAction:{
            return adapter.updateOne(action.payload.Group , state);
        }
            
        case GroupActionTypes.DeleteGroupAction:{
            return adapter.removeOne( action.payload.group , state); 
        }
           
        case GroupActionTypes.ListGroupSuccessAction:{
            state.allGroupsLoaded = true;
            let data =  action.payload.groups;
            data.map( obj =>{
                obj.id = obj.id_group;
            });
            return adapter.addMany(data , state);
        }
           
        default: {
            return state;
        }
    }
}

export const getGroupContacId = (state: GroupState) => state.selectedGrouptId; 

export const { selectAll, selectEntities, selectIds, selectTotal  } = adapter.getSelectors();
  // select the array of user ids
export const selectContactsIds = selectIds;
  // select the dictionary of user entities
export const selectContactsEntities = selectEntities;
  // select the array of users
export const selectAllContacts = selectAll;
  // select the total user count
export const selectContactsTotal = selectTotal;




