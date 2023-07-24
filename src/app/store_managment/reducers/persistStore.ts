import { ActionReducer } from '@ngrx/store';
//import { Database } from '../db_store/database';

export interface NgrxStorePersistConfiguration {
	storage: Storage;
	key: string;
	afterInit?: (state, action) => any;
}

export interface NgrxStorePersistIndexDbConfiguration {
	storage: Storage;
	storeName: string;
	key: string;
	afterInit?: (state, action) => any;
}

const INIT_ACTION = '@ngrx/store/init';

export const syncStoreWithStorage = (configuration: NgrxStorePersistConfiguration) => (reducer: ActionReducer<any>): ActionReducer<any> => {
	return (state, action) => {
		switch (action.type) {
			case INIT_ACTION:
				const stateFromSessionStorage = configuration.storage.getItem(configuration.key);
				state = !!stateFromSessionStorage ? JSON.parse(stateFromSessionStorage) : state;
				if (configuration.afterInit) {
					configuration.afterInit(state, action);
				}
				return state;
			default:
				const nextState = reducer(state, action);
				configuration.storage.setItem(configuration.key, JSON.stringify(nextState));
				return nextState;
		}
	};
};