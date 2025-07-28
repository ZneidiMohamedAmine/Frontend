import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { MessageService, ConfirmationService } from 'primeng/api';

import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/business.models';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule,
        DropdownModule, DialogModule, TagModule, ConfirmDialogModule, ToastModule,
        ToolbarModule, CardModule, InputSwitchModule, CalendarModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
        <div class="card">
            <p-toolbar styleClass="mb-4">
                <ng-template pTemplate="left">
                    <h2 class="m-0">User Management</h2>
                </ng-template>
                <ng-template pTemplate="right">
                    <p-button 
                        label="New User" 
                        icon="pi pi-plus" 
                        styleClass="p-button-success mr-2"
                        (click)="openNew()">
                    </p-button>
                    <p-button 
                        label="Export" 
                        icon="pi pi-upload" 
                        styleClass="p-button-help"
                        (click)="exportUsers()">
                    </p-button>
                </ng-template>
            </p-toolbar>

            <p-table 
                #dt 
                [value]="users" 
                [rows]="10" 
                [paginator]="true" 
                [globalFilterFields]="['nom','email','role']"
                [tableStyle]="{'min-width': '75rem'}"
                [(selection)]="selectedUsers" 
                [rowHover]="true" 
                dataKey="id"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [showCurrentPageReport]="true">
                
                <ng-template pTemplate="caption">
                    <div class="flex align-items-center justify-content-between">
                        <h5 class="m-0">Manage Users</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input 
                                pInputText 
                                type="text" 
                                (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                                placeholder="Search..." />
                        </span>
                    </div>
                </ng-template>
                
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 3rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th pSortableColumn="nom">Name <p-sortIcon field="nom"></p-sortIcon></th>
                        <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                        <th pSortableColumn="role">Role <p-sortIcon field="role"></p-sortIcon></th>
                        <th pSortableColumn="isActive">Status <p-sortIcon field="isActive"></p-sortIcon></th>
                        <th pSortableColumn="dateCreation">Created <p-sortIcon field="dateCreation"></p-sortIcon></th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                
                <ng-template pTemplate="body" let-user>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="user"></p-tableCheckbox>
                        </td>
                        <td>{{ user.nom }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <p-tag 
                                [value]="user.role" 
                                [severity]="getRoleSeverity(user.role)">
                            </p-tag>
                        </td>
                        <td>
                            <p-tag 
                                [value]="user.isActive ? 'Active' : 'Inactive'" 
                                [severity]="user.isActive ? 'success' : 'danger'">
                            </p-tag>
                        </td>
                        <td>{{ user.dateCreation | date:'short' }}</td>
                        <td>
                            <p-button 
                                icon="pi pi-pencil" 
                                styleClass="p-button-rounded p-button-success mr-2" 
                                (click)="editUser(user)">
                            </p-button>
                            <p-button 
                                icon="pi pi-trash" 
                                styleClass="p-button-rounded p-button-warning" 
                                (click)="deleteUser(user)">
                            </p-button>
                        </td>
                    </tr>
                </ng-template>
                
                <ng-template pTemplate="summary">
                    <div class="flex align-items-center justify-content-between">
                        In total there are {{ users ? users.length : 0 }} users.
                    </div>
                </ng-template>
            </p-table>
        </div>

        <!-- User Dialog -->
        <p-dialog 
            [(visible)]="userDialog" 
            [style]="{width: '450px'}" 
            header="User Details" 
            [modal]="true" 
            styleClass="p-fluid">
            
            <ng-template pTemplate="content">
                <div class="field">
                    <label for="nom">Name</label>
                    <input 
                        type="text" 
                        pInputText 
                        id="nom" 
                        [(ngModel)]="user.nom" 
                        required 
                        autofocus />
                    <small class="p-error" *ngIf="submitted && !user.nom">Name is required.</small>
                </div>
                
                <div class="field">
                    <label for="email">Email</label>
                    <input 
                        type="email" 
                        pInputText 
                        id="email" 
                        [(ngModel)]="user.email" 
                        required />
                    <small class="p-error" *ngIf="submitted && !user.email">Email is required.</small>
                </div>
                
                <div class="field">
                    <label for="telephone">Phone</label>
                    <input 
                        type="text" 
                        pInputText 
                        id="telephone" 
                        [(ngModel)]="user.telephone" />
                </div>
                
                <div class="field">
                    <label for="adresse">Address</label>
                    <input 
                        type="text" 
                        pInputText 
                        id="adresse" 
                        [(ngModel)]="user.adresse" />
                </div>
                
                <div class="field">
                    <label for="role">Role</label>
                    <p-dropdown 
                        [(ngModel)]="user.role" 
                        [options]="roles" 
                        optionLabel="label" 
                        optionValue="value" 
                        placeholder="Select a Role">
                    </p-dropdown>
                </div>
                
                <div class="field">
                    <label for="isActive">Active</label>
                    <p-inputSwitch [(ngModel)]="user.isActive"></p-inputSwitch>
                </div>
                
                <div class="field" *ngIf="!user.id">
                    <label for="motdepasse">Password</label>
                    <input 
                        type="password" 
                        pInputText 
                        id="motdepasse" 
                        [(ngModel)]="user.motdepasse" 
                        [required]="!user.id" />
                    <small class="p-error" *ngIf="submitted && !user.motdepasse && !user.id">Password is required for new users.</small>
                </div>
            </ng-template>
            
            <ng-template pTemplate="footer">
                <p-button 
                    label="Cancel" 
                    icon="pi pi-times" 
                    styleClass="p-button-text" 
                    (click)="hideDialog()">
                </p-button>
                <p-button 
                    label="Save" 
                    icon="pi pi-check" 
                    styleClass="p-button-text" 
                    (click)="saveUser()">
                </p-button>
            </ng-template>
        </p-dialog>

        <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
        <p-toast></p-toast>
    `
})
export class AdminUsers implements OnInit {
    users: Utilisateur[] = [];
    selectedUsers: Utilisateur[] = [];
    user: Utilisateur = {};
    userDialog: boolean = false;
    submitted: boolean = false;
    loading: boolean = false;

    roles = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Client', value: 'Client' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Employee', value: 'Employee' }
    ];

    constructor(
        private utilisateurService: UtilisateurService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (data) => {
                this.users = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading users:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load users'
                });
                this.loading = false;
            }
        });
    }

    openNew() {
        this.user = { isActive: true };
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: Utilisateur) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: Utilisateur) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (user.id) {
                    this.utilisateurService.deleteUtilisateur(user.id).subscribe({
                        next: () => {
                            this.users = this.users.filter(u => u.id !== user.id);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'User Deleted'
                            });
                        },
                        error: (error) => {
                            console.error('Error deleting user:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete user'
                            });
                        }
                    });
                }
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.nom?.trim() && this.user.email?.trim()) {
            if (this.user.id) {
                // Update existing user
                this.utilisateurService.updateUtilisateur(this.user.id, this.user).subscribe({
                    next: (updatedUser) => {
                        const index = this.users.findIndex(u => u.id === this.user.id);
                        if (index !== -1) {
                            this.users[index] = updatedUser;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'User Updated'
                        });
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error updating user:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update user'
                        });
                    }
                });
            } else {
                // Create new user
                this.utilisateurService.createUtilisateur(this.user).subscribe({
                    next: (newUser) => {
                        this.users.push(newUser);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'User Created'
                        });
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error creating user:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create user'
                        });
                    }
                });
            }
        }
    }

    getRoleSeverity(role: string): string {
        switch (role) {
            case 'Admin':
                return 'danger';
            case 'Manager':
                return 'warning';
            case 'Employee':
                return 'info';
            case 'Client':
                return 'success';
            default:
                return 'secondary';
        }
    }

    exportUsers() {
        // Implement export functionality
        this.messageService.add({
            severity: 'info',
            summary: 'Export',
            detail: 'Export functionality will be implemented'
        });
    }
}