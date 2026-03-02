import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";
import {RoleEntity} from "@/types/entity";

const initialState: RoleEntity = {
	id: null,
	name: null,
	icon: null,
	description: null,
}

export const roleSlice = createSlice({
	name: 'role',
	initialState,
	reducers: {
		resetRole: (): RoleEntity => initialState,
		setRole: (state, action): void => {
			state.id = action.payload.id
			state.name = action.payload.name
			state.icon = action.payload.icon
			state.description = action.payload.description
		}
	}
})

export const {setRole, resetRole} = roleSlice.actions
export const selectRoleId: (state: RootState) => number | null = (state: RootState): number | null => state.role.id
export const selectRoleName: (state: RootState) => string | null = (state: RootState): string | null => state.role.name
export const selectRoleIcon: (state: RootState) => string | null = (state: RootState): string | null => state.role.icon
export const selectRoleDescription: (state: RootState) => string | null = (state: RootState): string | null => state.role.description

export default roleSlice.reducer
