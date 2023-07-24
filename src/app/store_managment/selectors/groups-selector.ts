import { createFeatureSelector, createSelector} from '@ngrx/store';
import { GroupState , GroupReducer } from '../reducers/groups-reducer';


export const selectGroupsState = createFeatureSelector<GroupState>("group");
export const selectGroupById   = (GroupId:number) => createSelector( selectGroupsState, GroupState => GroupState.entities[GroupId] );
export const selectAllGroups   = createSelector( selectGroupsState, GroupState => GroupState.entities );
export const nbreTotalGroup    = createSelector( selectGroupsState, GroupState => GroupState.ids );