import {Action} from "@ngrx/store";
import {User} from "../../models/user.model";
import {UserAction} from "./user.actions";

export interface UserState {
  user: User | null,
  error: any | null
}

const initialState: UserState = {
  user: null,
  error: null
};

export function userReducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    default:
      return state;
  }
}
