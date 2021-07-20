import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../models/authentication';
import USERS from './users.seed'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _users = new BehaviorSubject<IUser[]>(USERS);

    constructor() {}

    public getUsers(): Observable<IUser[]> {
        return this._users;
    }

    public getById(id: string): IUser {
        let users = this._users.getValue();
        return users.filter(x => x.id == id)[0];
    }
    
    public addUser(user: IUser) {
        let users = this._users.getValue();
        user.id = uuidv4();
        user.position = users.length + 1;

        users = [user, ...users];
        this._users.next(users);
    }

    public updateUser(id: string, updated: IUser) {
        let users = this._users.getValue();

        users = users.map(x => {
            if (x.id != id) {
                return x;
            }
            else {
                return updated;
            }
        })

        this._users.next(users);
    }

    public deleteUser(id: string) {
        let users = this._users.getValue();
        users = users.filter(x => x.id != id);
        this._users.next(users);
    }
}
