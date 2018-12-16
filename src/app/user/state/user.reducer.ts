import { User } from '../user';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.action';

export interface State extends fromRoot.State {
    users: UserState;
}

export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

const getUserFeatureSelector = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureSelector,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserFeatureSelector,
    state => state.currentUser
);

export function reducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {

        case UserActionTypes.ToggleUserMask:
        return {
            ...state,
            maskUserName: action.payload
        };

        default:
            return state;
    }
}
