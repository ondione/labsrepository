
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';
import { PrintObject } from '../../models/printObject' ;
import { PrintObjectActionTypes , PrintObjectActions } from '../actions/printObject-action';

export interface PrintState extends EntityState<PrintObject> {
    allDataLoaded:boolean;
}

export const adapter: EntityAdapter<PrintObject> = createEntityAdapter<PrintObject>();

export const initialPrintState: PrintState = adapter.getInitialState({
    allDataLoaded:false
});

export function PrintReducer(state = initialPrintState, action: PrintObjectActions): PrintState {
    switch(action.type) {

        case PrintObjectActionTypes.ImprimeContactListInPdfResponseAction:{
            let data = action.payload.printObject;
            data["id"] = 1;
            return adapter.addOne(data, state);
        }

        case PrintObjectActionTypes.ExportContactListInCsvResponseAction:{
          let data = action.payload.printObject;
          data["id"] = 2;
          return adapter.addOne(data, state);
        }

        case PrintObjectActionTypes.ResetPrintAction:{
            return adapter.removeOne(1,state);
        }
               
        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal  } = adapter.getSelectors();