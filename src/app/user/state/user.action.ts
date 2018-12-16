import { Action } from '@ngrx/store';

export enum UserActionTypes {
    ToggleUserMask = '[User] Toggle mask'
}

export class ToggleUserMask implements Action {
    readonly type = UserActionTypes.ToggleUserMask;

    constructor(public payload: boolean) { }
}

export type UserActions = ToggleUserMask ;
