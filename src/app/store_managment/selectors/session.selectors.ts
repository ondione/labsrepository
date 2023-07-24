
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AuthState } from '../reducers/user-reducers';

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(selectAuthState, AuthState => AuthState.loggedIn);
export const sessionData = createSelector(selectAuthState, AuthState => AuthState.sessionData );

export const sessionUserData = createSelector( selectAuthState, AuthState => AuthState.sessionUserData );
export const profil = createSelector( selectAuthState, AuthState => AuthState.profil);
export const isLoggedOut = createSelector(selectAuthState, AuthState => !AuthState.loggedIn);
export const permissions = createSelector(selectAuthState, AuthState => AuthState.permissions );
export const hasPermission = createSelector(selectAuthState, AuthState => !!AuthState.permissions );
export const getScreenLockStatus = createSelector(selectAuthState, AuthState => !!AuthState.isLockScreen );

