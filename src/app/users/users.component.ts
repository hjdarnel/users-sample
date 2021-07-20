import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IUser, User } from "src/app/models/authentication/user";
import { UserService } from "../services";

export type UserTable =
    | User
    | {
          position: number;
      };

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
    constructor(
        private userService: UserService,
        private _snackBar: MatSnackBar
    ) {}
    
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    dataSource = new MatTableDataSource<IUser>();
    
    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => {
            this.dataSource.data = users;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
        })
    }

    onClickDelete(id: string) : void {
        this.userService.deleteUser(id);
        this._snackBar.open("Deleted user", null, {
            duration: 1000,
            horizontalPosition: 'start'
        });
    }

    displayedColumns: string[] = [
        "position",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "delete",
        "edit"
    ];    
}
