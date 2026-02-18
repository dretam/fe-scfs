import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";
import {LogoutDialogSlice} from "@/types/store";

const initialState: LogoutDialogSlice = {
	isOpen: false
}

export const logoutDialogSlice = createSlice({
	name: 'logoutDialog',
	initialState,
	reducers: {
		resetLogoutDialog: (): LogoutDialogSlice => initialState,
		setLogoutDialog: (state, action): void => {
			state.isOpen = action.payload.isOpen;
		}
	}
})

export const {setLogoutDialog, resetLogoutDialog} = logoutDialogSlice.actions

export const selectLogoutDialogIsOpen: (state: RootState) => boolean = (state: RootState): boolean => state.logoutDialog?.isOpen

export default logoutDialogSlice.reducer
