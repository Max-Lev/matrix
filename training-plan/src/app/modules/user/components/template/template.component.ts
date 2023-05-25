import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  template: `
    <ng-container [formGroup]="controlContainer.control">
    <mat-form-field class="full-width">
        <mat-label>User Name</mat-label>
        <input matInput type="text" formControlName="username">
        <button type="button" matSuffix mat-icon-button aria-label="User Name">
            <!-- (click)="loginForm.get('username')?.setValue('')" -->
            <mat-icon>close</mat-icon>
        </button>
    </mat-form-field>

    <mat-form-field class=" full-width">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password">
        <button type="button" matSuffix mat-icon-button aria-label="Password">
            <!-- (click)="loginForm.get('password')?.setValue('')" -->
            <mat-icon>close</mat-icon>
        </button>
    </mat-form-field>
    </ng-container>
  `,
})
export class TemplateComponent {
  constructor(public controlContainer: ControlContainer) {

  }
}
