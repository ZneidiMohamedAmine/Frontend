import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransactionService } from '../../../services/transaction.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ProjetService } from '../../../services/projet.service';
import { Transaction, Utilisateur, Projet } from '../../../models/business.models';

@Component({
    selector: 'app-admin-transactions',
    standalone: true,
    imports: [
        CommonModule, TableModule, CardModule, ButtonModule, TagModule,
        DialogModule, InputTextModule, InputTextarea, InputNumberModule,
        DropdownModule, CalendarModule, ConfirmDialogModule, ToastModule, FormsModule
    ],
    providers: [ConfirmationService, MessageService],
    template: `<div class="grid">
    <div class="col-12">
        <div class="card">
            <div class="flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                        <i class="pi pi-credit-card mr-3 text-primary"></i>Transaction Management
                    </h1>
                    <p class="text-muted-color text-lg">Manage all financial transactions</p>
                </div>
                <div class="flex gap-2">
                    <p-button
                        icon="pi pi-refresh"
                        styleClass="p-button-outlined p-button-secondary"
                        (click)="loadTransactions()"
                        [loading]="loading">
                    </p-button>
                    <p-button
                        label="New Transaction"
                        icon="pi pi-plus"
                        (click)="showDialog()">
                    </p-button>
                </div>
            </div>

            <!-- Summary Cards -->
            <div class="grid mb-4">
                <div class="col-12 md:col-3">
                    <div class="card bg-green-100 border-left-3 border-green-500">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Total Credits</span>
                                <div class="text-900 font-medium text-xl">€{{ totalCredits | number:'1.2-2' }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-green-500 border-round" style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-arrow-up text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-3">
                    <div class="card bg-red-100 border-left-3 border-red-500">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Total Debits</span>
                                <div class="text-900 font-medium text-xl">€{{ totalDebits | number:'1.2-2' }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-red-500 border-round" style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-arrow-down text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-3">
                    <div class="card bg-blue-100 border-left-3 border-blue-500">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Net Balance</span>
                                <div class="text-900 font-medium text-xl">€{{ netBalance | number:'1.2-2' }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-500 border-round" style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-wallet text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-3">
                    <div class="card bg-orange-100 border-left-3 border-orange-500">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Pending</span>
                                <div class="text-900 font-medium text-xl">{{ pendingCount }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-orange-500 border-round" style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-clock text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Transactions Table -->
            <p-table
                [value]="transactions"
                [paginator]="true"
                [rows]="10"
                [loading]="loading"
                [globalFilterFields]="['description', 'reference', 'statut']"
                #dt>

                <ng-template pTemplate="caption">
                    <div class="flex justify-content-between">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input
                                pInputText
                                type="text"
                                #searchInput
                                (input)="dt.filterGlobal(searchInput.value, 'contains')"
                                placeholder="Search transactions..." />
                        </span>
                    </div>
                </ng-template>

                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="reference">Reference <p-sortIcon field="reference"></p-sortIcon></th>
                        <th pSortableColumn="dateTransaction">Date <p-sortIcon field="dateTransaction"></p-sortIcon></th>
                        <th pSortableColumn="type">Type <p-sortIcon field="type"></p-sortIcon></th>
                        <th pSortableColumn="montant">Amount <p-sortIcon field="montant"></p-sortIcon></th>
                        <th pSortableColumn="description">Description <p-sortIcon field="description"></p-sortIcon></th>
                        <th pSortableColumn="statut">Status <p-sortIcon field="statut"></p-sortIcon></th>
                        <th>User</th>
                        <th>Project</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-transaction>
                    <tr>
                        <td>
                            <span class="font-medium">{{ transaction.reference || 'N/A' }}</span>
                        </td>
                        <td>{{ transaction.dateTransaction | date:'short' }}</td>
                        <td>
                            <p-tag
                                [value]="transaction.type"
                                [severity]="transaction.type === 'CREDIT' ? 'success' : 'danger'"
                                [icon]="transaction.type === 'CREDIT' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'">
                            </p-tag>
                        </td>
                        <td>
                            <span [class]="transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'" class="font-medium">
                                {{ transaction.type === 'CREDIT' ? '+' : '-' }}€{{ transaction.montant | number:'1.2-2' }}
                            </span>
                        </td>
                        <td>{{ transaction.description || 'No description' }}</td>
                        <td>
                            <p-tag
                                [value]="transaction.statut"
                                [severity]="getStatusSeverity(transaction.statut)">
                            </p-tag>
                        </td>
                        <td>{{ getUserName(transaction.utilisateurId) }}</td>
                        <td>{{ getProjectName(transaction.projetId) }}</td>
                        <td>
                            <div class="flex gap-2">
                                <p-button
                                    icon="pi pi-pencil"
                                    styleClass="p-button-rounded p-button-text p-button-sm"
                                    (click)="editTransaction(transaction)"
                                    pTooltip="Edit">
                                </p-button>
                                <p-button
                                    icon="pi pi-trash"
                                    styleClass="p-button-rounded p-button-text p-button-sm p-button-danger"
                                    (click)="deleteTransaction(transaction)"
                                    pTooltip="Delete">
                                </p-button>
                            </div>
                        </td>
                    </tr>
                </ng-template>

                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="9" class="text-center py-4">
                            <i class="pi pi-credit-card text-4xl text-muted-color mb-3"></i>
                            <div class="text-muted-color">No transactions found</div>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</div>

<!-- Transaction Dialog -->
<p-dialog
    [(visible)]="transactionDialog"
    [style]="{width: '600px'}"
    header="Transaction Details"
    [modal]="true"
    styleClass="p-fluid">

    <ng-template pTemplate="content">
        <div class="grid">
            <div class="col-6">
                <label for="type">Type *</label>
                <p-dropdown
                    id="type"
                    [(ngModel)]="transaction.type"
                    [options]="typeOptions"
                    optionLabel="label"
                    optionValue="value">
                </p-dropdown>
            </div>

            <div class="col-6">
                <label for="montant">Amount *</label>
                <p-inputNumber
                    id="montant"
                    [(ngModel)]="transaction.montant"
                    mode="currency"
                    currency="EUR"
                    locale="fr-FR">
                </p-inputNumber>
            </div>

            <div class="col-12">
                <label for="description">Description</label>
                <textarea
                    pInputTextarea
                    id="description"
                    [(ngModel)]="transaction.description"
                    rows="3">
                </textarea>
            </div>

            <div class="col-6">
                <label for="dateTransaction">Transaction Date *</label>
                <p-calendar
                    id="dateTransaction"
                    [(ngModel)]="transaction.dateTransaction"
                    dateFormat="dd/mm/yy"
                    [showTime]="true">
                </p-calendar>
            </div>

            <div class="col-6">
                <label for="statut">Status *</label>
                <p-dropdown
                    id="statut"
                    [(ngModel)]="transaction.statut"
                    [options]="statusOptions"
                    optionLabel="label"
                    optionValue="value">
                </p-dropdown>
            </div>

            <div class="col-6">
                <label for="reference">Reference</label>
                <input
                    pInputText
                    id="reference"
                    [(ngModel)]="transaction.reference" />
            </div>

            <div class="col-6">
                <label for="utilisateurId">User</label>
                <p-dropdown
                    id="utilisateurId"
                    [(ngModel)]="transaction.utilisateurId"
                    [options]="users"
                    optionLabel="nom"
                    optionValue="id"
                    placeholder="Select a user">
                </p-dropdown>
            </div>

            <div class="col-12">
                <label for="projetId">Project</label>
                <p-dropdown
                    id="projetId"
                    [(ngModel)]="transaction.projetId"
                    [options]="projects"
                    optionLabel="nom"
                    optionValue="id"
                    placeholder="Select a project">
                </p-dropdown>
            </div>
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
            (click)="saveTransaction()"
            [disabled]="!isFormValid()">
        </p-button>
    </ng-template>
</p-dialog>

<p-confirmDialog></p-confirmDialog>
<p-toast></p-toast>`})
export class AdminTransactions implements OnInit {
    transactions: Transaction[] = [];
    transaction: Transaction = {
        montant: 0,
        type: 'CREDIT',
        dateTransaction: new Date(),
        statut: 'PENDING'
    };
    transactionDialog: boolean = false;
    loading: boolean = false;
    users: Utilisateur[] = [];
    projects: Projet[] = [];

    totalCredits: number = 0;
    totalDebits: number = 0;
    netBalance: number = 0;
    pendingCount: number = 0;

    typeOptions = [
        { label: 'Credit', value: 'CREDIT' },
        { label: 'Debit', value: 'DEBIT' }
    ];

    statusOptions = [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Cancelled', value: 'CANCELLED' }
    ];

    constructor(
        private transactionService: TransactionService,
        private utilisateurService: UtilisateurService,
        private projetService: ProjetService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadTransactions();
        this.loadUsers();
        this.loadProjects();
    }

    loadTransactions() {
        this.loading = true;
        this.transactionService.getAllTransactions().subscribe({
            next: (data) => {
                this.transactions = data;
                this.calculateSummary();
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading transactions:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load transactions'
                });
                this.loading = false;
            }
        });
    }

    loadUsers() {
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (users) => {
                this.users = users;
            },
            error: (error) => {
                console.error('Error loading users:', error);
            }
        });
    }

    loadProjects() {
        this.projetService.getAllProjets().subscribe({
            next: (projects) => {
                this.projects = projects;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
            }
        });
    }

    calculateSummary() {
        this.totalCredits = this.transactions
            .filter(t => t.type === 'CREDIT' && t.statut === 'COMPLETED')
            .reduce((sum, t) => sum + (t.montant || 0), 0);

        this.totalDebits = this.transactions
            .filter(t => t.type === 'DEBIT' && t.statut === 'COMPLETED')
            .reduce((sum, t) => sum + (t.montant || 0), 0);

        this.netBalance = this.totalCredits - this.totalDebits;
        this.pendingCount = this.transactions.filter(t => t.statut === 'PENDING').length;
    }

    showDialog() {
        this.transaction = {
            montant: 0,
            type: 'CREDIT',
            statut: 'PENDING',
            dateTransaction: new Date()
        };
        this.transactionDialog = true;
    }

    hideDialog() {
        this.transactionDialog = false;
        this.transaction = {
            montant: 0,
            type: 'CREDIT',
            dateTransaction: new Date(),
            statut: 'PENDING'
        };
    }

    editTransaction(transaction: Transaction) {
        this.transaction = { ...transaction };
        this.transactionDialog = true;
    }

    saveTransaction() {
        if (this.isFormValid()) {
            if (this.transaction.id) {
                this.transactionService.updateTransaction(this.transaction.id, this.transaction).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Transaction updated successfully'
                        });
                        this.loadTransactions();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error updating transaction:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update transaction'
                        });
                    }
                });
            } else {
                this.transactionService.createTransaction(this.transaction).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Transaction created successfully'
                        });
                        this.loadTransactions();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error creating transaction:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create transaction'
                        });
                    }
                });
            }
        }
    }

    deleteTransaction(transaction: Transaction) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete this transaction?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (transaction.id) {
                    this.transactionService.deleteTransaction(transaction.id).subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Transaction deleted successfully'
                            });
                            this.loadTransactions();
                        },
                        error: (error) => {
                            console.error('Error deleting transaction:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete transaction'
                            });
                        }
                    });
                }
            }
        });
    }

    isFormValid(): boolean {
        return !!(this.transaction.type && this.transaction.montant && this.transaction.dateTransaction && this.transaction.statut);
    }

    getStatusSeverity(status: string): string {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'COMPLETED': return 'success';
            case 'CANCELLED': return 'danger';
            default: return 'info';
        }
    }

    getUserName(userId?: number): string {
        if (!userId) return 'N/A';
        const user = this.users.find(u => u.id === userId);
        return user?.nom || 'Unknown User';
    }

    getProjectName(projectId?: number): string {
        if (!projectId) return 'N/A';
        const project = this.projects.find(p => p.id === projectId);
        return project?.nom || 'Unknown Project';
    }
}