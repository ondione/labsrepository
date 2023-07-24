import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Group  }  from '../../models/groupe';

export enum GroupActionTypes {
    AddGroupAction    = '[Add Group] Action',
    UpdateGroupAction = '[Update Group] Action',
    DeleteGroupAction = '[Delete a Group] Action',
    ListGroupAction   = '[Request List Group] Action',
    ListGroupSuccessAction = '[Get List Group] Action',
    GetGroupByIdAction   = '[Get Group By Id ] Action',
    AddContactToGroupAction = '[Add Contact to Group ] Action'
}

export class AddGroupAction implements Action {
    readonly type = GroupActionTypes.AddGroupAction;
    constructor(public payload:{ Group: Group }) { }
}

export class UpdateGroupAction implements Action {
    readonly type = GroupActionTypes.UpdateGroupAction;
    constructor(public payload:{ Group:  Update<Group> }) { }
}
export class DeleteGroupAction implements Action {
    readonly type = GroupActionTypes.DeleteGroupAction;
    constructor(public payload:{ group: any }) { }
}

export class ListGroupAction implements Action {
    readonly type = GroupActionTypes.ListGroupAction;
}
export class ListGroupSuccessAction implements Action {
    readonly type = GroupActionTypes.ListGroupSuccessAction;
    constructor(public payload:{ groups: any }) { }
}

export class GetGroupByIdAction implements Action {
    readonly type = GroupActionTypes.GetGroupByIdAction;
    constructor(public payload:{ idGroup: number }) { }
}

export type GroupActions =  AddGroupAction | UpdateGroupAction | DeleteGroupAction | ListGroupAction | ListGroupSuccessAction
                    
