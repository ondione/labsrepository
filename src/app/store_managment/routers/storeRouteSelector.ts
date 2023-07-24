import {createFeatureSelector, createSelector} from '@ngrx/store';
import {routerStateConfig} from './storeRouterModule';
import {MergedRouteReducerState} from '../reducers/routeReducer';

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);