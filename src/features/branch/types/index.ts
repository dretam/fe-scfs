import { BaseAuditResponse } from "@/types/response";

export interface BranchResponse extends BaseAuditResponse {
    id?: number;
    idBranch?: string;
    branchName?: string;
    flagDel?: boolean;
    category?: string;
    regional?: string;
    address?: string;
    area?: string;
    direktorat?: string;
    modId?: number;
    telepon?: number;
    faximile?: number;
    singkatan?: string;
}
