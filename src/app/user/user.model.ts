export interface User {
    token: String;
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
    deleted: boolean;
    role: string;
}
