import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];
  existingUser = true;
  existingUserId: string;

  profileForm = this._fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    position: ['']
  });

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._subscriptions = [];

    this._subscriptions.push(
      this._route.params.subscribe({
        next: (params) => {
          this.existingUserId = params['id'];

          if (this.existingUserId && this.existingUserId !== 'new') {
            const user = this._userService.getById(this.existingUserId);
            this.profileForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              position: user.position
            });
          } else {
            this.existingUser = false;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this._subscriptions && this._subscriptions.length > 0) {
      this._subscriptions.forEach((x) => x.unsubscribe());
    }
  }

  onSave(): void {
    this.existingUser
      ? this._userService.updateUser(this.existingUserId, this.profileForm.value)
      : this._userService.addUser(this.profileForm.value);
    this._router.navigate(['..']);
    this._snackBar.open(`${this.existingUser ? 'Updated' : 'Added'}  user!`, null, {
      duration: 2000,
      horizontalPosition: 'start'
    });
  }
}
