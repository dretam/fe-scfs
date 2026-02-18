export interface RoleEntity {
	id: number | null,
	name: string | null,
	icon: string | null,
	description: string | null,
}

export interface UserEntity {
	id: number | null,
	name: string | null,
	email: string | null,
	role: RoleEntity | null,
}

export interface DocumentEntity {
	id: number,
	fileName: string,
	url: string,
}