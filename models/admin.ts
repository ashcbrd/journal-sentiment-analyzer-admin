// models/Admin.ts
export interface Admin {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface AdminCredentials {
    email: string;
    password: string;
}
