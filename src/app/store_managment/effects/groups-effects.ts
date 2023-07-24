import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { GroupService } from '../../services/groupe.services';

import { 
    GroupActions, 
    GroupActionTypes,
    AddGroupAction,
    UpdateGroupAction,
    DeleteGroupAction,
    ListGroupAction,
    ListGroupSuccessAction,
    GetGroupByIdAction
} from '../../store_managment/actions/groups-action';

import {  } from '../actions/contacts-action';
import { Contact }  from '../../models/contact';
import { Store, select } from '@ngrx/store';
import { State } from  '../../store_managment/reducers/index';

@Injectable()
export class GroupsEffects {

    addGroups$ = createEffect( () =>
        this.actions$.pipe(
            ofType<AddGroupAction>(GroupActionTypes.AddGroupAction),
            mergeMap( <Actions> (action) => this.groupService.addGroup(action.payload.Group)
                .pipe(
                    map( response =>{
                        this.store.dispatch( new ListGroupAction())
                    }),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );
 
    loadGroups$ = createEffect( () =>
        this.actions$.pipe(
            ofType<ListGroupAction>(GroupActionTypes.ListGroupAction),
            mergeMap( () => this.groupService.getListGroups()
                .pipe(
                    map( response =>{
                        console.log(response , " response add group")
                        this.store.dispatch( new ListGroupSuccessAction({ groups: response["allgroup"]}))
                    }),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    updateGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UpdateGroupAction>(GroupActionTypes.UpdateGroupAction),
            mergeMap( (group) => this.groupService.updateGroup(group)
                .pipe(
                    map(groups => { new ListGroupSuccessAction({ groups })}),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    deleteGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType<DeleteGroupAction>(GroupActionTypes.DeleteGroupAction ),
            mergeMap(<Actions> (action) => this.groupService.deleteGroup(action.payload.group)
                .pipe(
                    map(groups => {  new ListGroupSuccessAction({ groups })}),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private groupService: GroupService,
        private store: Store<State>
    ) {}
}