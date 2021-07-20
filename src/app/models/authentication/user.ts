export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    position: number;
}

export class User implements IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;

    constructor(clone: IUser = {} as IUser) {
        this.id = clone.id;
        this.firstName = clone.firstName;
        this.lastName = clone.lastName;
        this.email = clone.email;
        this.phoneNumber = clone.phoneNumber || undefined;
    }
    position: number;
}
