import { RoleEntity } from "@/features/role";

export interface UserEntity {
    id: number | null,
    name: string | null,
    email: string | null,
    role: RoleEntity | null,
}
