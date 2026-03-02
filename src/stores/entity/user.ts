import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";
import {UserEntity} from "@/types/entity";

const initialState: UserEntity = {
	id: null,
	name: null,
	email: null,
	role: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: (): UserEntity => initialState,
		setUser: (state, action): void => {
			state.id = action.payload.id
			state.name = action.payload.name
			state.email = action.payload.email
			state.role = action.payload.role
		}
	}
})

export const {setUser, resetUser} = userSlice.actions
export const selectUserId: (state: RootState) => number | null = (state: RootState): number | null => state.user.id
export const selectUserName: (state: RootState) => string | null = (state: RootState): string | null => state.user.name
export const selectUserEmail: (state: RootState) => string | null = (state: RootState): string | null => state.user.email
export const selectUserInitial: (state: RootState) => string = (state: RootState): string => {
	if (!state.user?.name) return "";
	const names = state.user?.name.trim().split(/\s+/); // split by whitespace
	const first = names[0]?.[0] || "";
	const last = names.length > 1 ? names[names.length - 1][0] : "";
	return (first + last).toUpperCase();
}
export default userSlice.reducer