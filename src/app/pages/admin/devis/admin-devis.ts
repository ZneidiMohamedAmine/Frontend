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
import { DevisService } from '../../../services/devis.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ProjetService } from '../../../services/projet.service';
import { Devis, DevisItem, Utilisateur, Projet } from '../../../models/business.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-devis',
    standalone: true,
    imports: [
        CommonModule, TableModule, CardModule, ButtonModule, TagModule,
        DialogModule, InputTextModule, InputTextarea, InputNumberModule,
        DropdownModule, CalendarModule, ConfirmDialogModule, ToastModule, FormsModule
    ],
    providers: [ConfirmationService, MessageService],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <div class="flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                                <i class="pi pi-file-edit mr-3 text-primary"></i>Quote Management
                            </h1>
                            <p class="text-muted-color text-lg">Manage all quotes and estimates</p>
                        </div>
                        <div class="flex gap-2">
                            <p-button 
                                icon="pi pi-refresh" 
                                styleClass="p-button-outlined p-button-secondary"
                                (click)="loadDevis()"
                                [loading]="loading">
                            </p-button>
                            <p-button 
                                label="New Quote" 
                                icon="pi pi-plus" 
                                (click)="showDialog()">
                            </p-button>
                        </div>
                    </div>

                    <!-- Summary Cards -->
                    <div class="grid mb-4">
                        <div class="col-12 md:col-3">
                            <div class="card bg-blue-100 border-left-3 border-blue-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Quotes</span>
                                        <div class="text-900 font-medium text-xl">{{ totalQuotes }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-file-edit text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-green-100 border-left-3 border-green-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Accepted</span>
                                        <div class="text-900 font-medium text-xl">{{ acceptedQuotes }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-green-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-check text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-orange-100 border-left-3 border-orange-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Pending</span>
                                        <div class="text-900 font-medium text-xl">{{ pendingQuotes }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-clock text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-cyan-100 border-left-3 border-cyan-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Value</span>
                                        <div class="text-900 font-medium text-xl">€{{ totalValue | number:'1.2-2' }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-cyan-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-euro text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quotes Table -->
                    <p-table 
                        [value]="devisList" 
                        [paginator]="true" 
                        [rows]="10"
                        [loading]="loading"
                        [globalFilterFields]="['numero', 'description', 'statut']"
                        #dt>
                        
                        <ng-template pTemplate="caption">
                            <div class="flex justify-content-between">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <input 
                                        pInputText 
                                        type="text" 
                                        (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                                        placeholder="Search quotes..." />
                                </span>
                            </div>
                        </ng-template>

                        <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="numero">Number <p-sortIcon field="numero"></p-sortIcon></th>
                                <th pSortableColumn="dateCreation">Created <p-sortIcon field="dateCreation"></p-sortIcon></th>
                                <th pSortableColumn="dateValidite">Valid Until <p-sortIcon field="dateValidite"></p-sortIcon></th>
                                <th>Client</th>
                                <th pSortableColumn="montantHT">Amount HT <p-sortIcon field="montantHT"></p-sortIcon></th>
                                <th pSortableColumn="montantTTC">Amount TTC <p-sortIcon field="montantTTC"></p-sortIcon></th>
                                <th pSortableColumn="statut">Status <p-sortIcon field="statut"></p-sortIcon></th>
                                <th>Project</th>
                                <th>Actions</th>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="body" let-devis>
                            <tr>
                                <td>
                                    <div>
                                        <div class="font-medium">{{ devis.numero }}</div>
                                        <div class="text-sm text-muted-color">{{ devis.description | slice:0:30 }}{{ devis.description?.length > 30 ? '...' : '' }}</div>
                                    </div>
                                </td>
                                <td>{{ devis.dateCreation | date:'short' }}</td>
                                <td>
                                    <span [class]="isExpired(devis.dateValidite) ? 'text-red-500' : ''">
                                        {{ devis.dateValidite | date:'short' }}
                                    </span>
                                </td>
                                <td>{{ getClientName(devis.clientId) }}</td>
                                <td>€{{ devis.montantHT | number:'1.2-2' }}</td>
                                <td>€{{ devis.montantTTC | number:'1.2-2' }}</td>
                                <td>
                                    <p-tag 
                                        [value]="devis.statut" 
                                        [severity]="getStatusSeverity(devis.statut)">
                                    </p-tag>
                                </td>
                                <td>
                                    <span *ngIf="hasLinkedProject(devis.id)" class="text-sm text-green-600">
                                        <i class="pi pi-check-circle mr-1"></i>Project Created
                                    </span>
                                    <span *ngIf="!hasLinkedProject(devis.id)" class="text-sm text-muted-color">
                                        No project
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-2">
                                        <p-button 
                                            icon="pi pi-eye" 
                                            styleClass="p-button-rounded p-button-text p-button-sm"
                                            (click)="viewDevis(devis)"
                                            pTooltip="View">
                                        </p-button>
                                        <p-button 
                                            icon="pi pi-pencil" 
                                            styleClass="p-button-rounded p-button-text p-button-sm"
                                            (click)="editDevis(devis)"
                                            pTooltip="Edit">
                                        </p-button>
                                        <p-button 
                                            *ngIf="devis.statut === 'ACCEPTE' && !hasLinkedProject(devis.id)"
                                            icon="pi pi-briefcase" 
                                            styleClass="p-button-rounded p-button-text p-button-sm p-button-success"
                                            (click)="createProjectFromDevis(devis)"
                                            pTooltip="Create Project">
                                        </p-button>
                                        <p-button 
                                            icon="pi pi-trash" 
                                            styleClass="p-button-rounded p-button-text p-button-sm p-button-danger"
                                            (click)="deleteDevis(devis)"
                                            pTooltip="Delete">
                                        </p-button>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="emptymessage">
                            <tr>
                                <td colspan="9" class="text-center py-4">
                                    <i class="pi pi-file-edit text-4xl text-muted-color mb-3"></i>
                                    <div class="text-muted-color">No quotes found</div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>

        <!-- Devis Dialog -->
        <p-dialog 
            [(visible)]="devisDialog" 
            [style]="{width: '800px'}" 
            header="Quote Details" 
            [modal]="true" 
            styleClass="p-fluid">
            
            <ng-template pTemplate="content">
                <div class="grid">
                    <div class="col-6">
                        <label for="numero">Quote Number *</label>
                        <input 
                            pInputText 
                            id="numero" 
                            [(ngModel)]="devis.numero" 
                            required />
                    </div>
                    
                    <div class="col-6">
                        <label for="clientId">Client *</label>
                        <p-dropdown 
                            id="clientId" 
                            [(ngModel)]="devis.clientId" 
                            [options]="clients" 
                            optionLabel="nom" 
                            optionValue="id"
                            placeholder="Select a client">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="dateCreation">Creation Date *</label>
                        <p-calendar 
                            id="dateCreation" 
                            [(ngModel)]="devis.dateCreation" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="dateValidite">Valid Until *</label>
                        <p-calendar 
                            id="dateValidite" 
                            [(ngModel)]="devis.dateValidite" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="statut">Status *</label>
                        <p-dropdown 
                            id="statut" 
                            [(ngModel)]="devis.statut" 
                            [options]="statusOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="tva">VAT Rate (%)</label>
                        <p-inputNumber 
                            id="tva" 
                            [(ngModel)]="devis.tva" 
                            [min]="0" 
                            [max]="100"
                            (onInput)="calculateTotals()">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-12">
                        <label for="description">Description</label>
                        <textarea 
                            pInputTextarea 
                            id="description" 
                            [(ngModel)]="devis.description" 
                            rows="3">
                        </textarea>
                    </div>
                    
                    <div class="col-12">
                        <label for="conditions">Terms & Conditions</label>
                        <textarea 
                            pInputTextarea 
                            id="conditions" 
                            [(ngModel)]="devis.conditions" 
                            rows="3">
                        </textarea>
                    </div>

                    <!-- Quote Items -->
                    <div class="col-12">
                        <div class="flex justify-content-between align-items-center mb-3">
                            <h5>Quote Items</h5>
                            <p-button 
                                label="Add Item" 
                                icon="pi pi-plus" 
                                styleClass="p-button-sm"
                                (click)="addItem()">
                            </p-button>
                        </div>
                        
                        <div *ngFor="let item of devis.items; let i = index" class="grid mb-3 p-3 border-1 border-round">
                            <div class="col-4">
                                <label>Designation *</label>
                                <input 
                                    pInputText 
                                    [(ngModel)]="item.designation" 
                                    (ngModelChange)="calculateItemTotal(item)" />
                            </div>
                            <div class="col-2">
                                <label>Quantity *</label>
                                <p-inputNumber 
                                    [(ngModel)]="item.quantite" 
                                    [min]="0"
                                    (onInput)="calculateItemTotal(item)">
                                </p-inputNumber>
                            </div>
                            <div class="col-2">
                                <label>Unit Price *</label>
                                <p-inputNumber 
                                    [(ngModel)]="item.prixUnitaire" 
                                    mode="currency" 
                                    currency="EUR"
                                    (onInput)="calculateItemTotal(item)">
                                </p-inputNumber>
                            </div>
                            <div class="col-2">
                                <label>Total</label>
                                <p-inputNumber 
                                    [ngModel]="item.montant" 
                                    mode="currency" 
                                    currency="EUR"
                                    [readonly]="true">
                                </p-inputNumber>
                            </div>
                            <div class="col-2 flex align-items-end">
                                <p-button 
                                    icon="pi pi-trash" 
                                    styleClass="p-button-danger p-button-sm"
                                    (click)="removeItem(i)">
                                </p-button>
                            </div>
                            <div class="col-12">
                                <label>Description</label>
                                <textarea 
                                    pInputTextarea 
                                    [(ngModel)]="item.description" 
                                    rows="2">
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Totals -->
                    <div class="col-12">
                        <div class="grid">
                            <div class="col-8"></div>
                            <div class="col-4">
                                <div class="grid">
                                    <div class="col-6"><strong>Subtotal HT:</strong></div>
                                    <div class="col-6 text-right">€{{ devis.montantHT | number:'1.2-2' }}</div>
                                    <div class="col-6"><strong>VAT ({{ devis.tva }}%):</strong></div>
                                    <div class="col-6 text-right">€{{ (devis.montantTTC - devis.montantHT) | number:'1.2-2' }}</div>
                                    <div class="col-6"><strong>Total TTC:</strong></div>
                                    <div class="col-6 text-right"><strong>€{{ devis.montantTTC | number:'1.2-2' }}</strong></div>
                                </div>
                            </div>
                        </div>
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
                    (click)="saveDevis()" 
                    [disabled]="!isFormValid()">
                </p-button>
            </ng-template>
        </p-dialog>

        <!-- Create Project Dialog -->
        <p-dialog 
            [(visible)]="createProjectDialog" 
            [style]="{width: '600px'}" 
            header="Create Project from Quote" 
            [modal]="true" 
            styleClass="p-fluid">
            
            <ng-template pTemplate="content">
                <div *ngIf="selectedDevisForProject" class="grid">
                    <!-- Quote Information -->
                    <div class="col-12">
                        <div class="card bg-blue-50 border-1 border-blue-200 mb-4">
                            <h6 class="text-blue-800 mb-3">
                                <i class="pi pi-file-edit mr-2"></i>Quote Information
                            </h6>
                            <div class="grid">
                                <div class="col-6">
                                    <small class="text-muted-color">Quote Number:</small>
                                    <div class="font-medium">{{ selectedDevisForProject.numero }}</div>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted-color">Amount:</small>
                                    <div class="font-medium text-green-600">€{{ selectedDevisForProject.montantTTC | number:'1.2-2' }}</div>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted-color">Client:</small>
                                    <div class="font-medium">{{ getClientName(selectedDevisForProject.clientId) }}</div>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted-color">Description:</small>
                                    <div class="font-medium">{{ selectedDevisForProject.description | slice:0:50 }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Details -->
                    <div class="col-12">
                        <label for="projectName">Project Name *</label>
                        <input 
                            pInputText 
                            id="projectName" 
                            [(ngModel)]="newProject.nom" 
                            required />
                    </div>
                    
                    <div class="col-12">
                        <label for="projectDescription">Project Description</label>
                        <textarea 
                            pInputTextarea 
                            id="projectDescription" 
                            [(ngModel)]="newProject.description" 
                            rows="3">
                        </textarea>
                    </div>
                    
                    <div class="col-6">
                        <label for="projectStartDate">Start Date *</label>
                        <p-calendar 
                            id="projectStartDate" 
                            [(ngModel)]="newProject.dateDebut" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="projectEndDate">End Date</label>
                        <p-calendar 
                            id="projectEndDate" 
                            [(ngModel)]="newProject.dateFin" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="projectBudget">Budget *</label>
                        <p-inputNumber 
                            id="projectBudget" 
                            [(ngModel)]="newProject.budget" 
                            mode="currency" 
                            currency="EUR" 
                            locale="fr-FR">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-6">
                        <label for="projectPriority">Priority</label>
                        <p-dropdown 
                            id="projectPriority" 
                            [(ngModel)]="newProject.priorite" 
                            [options]="priorityOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                </div>
            </ng-template>
            
            <ng-template pTemplate="footer">
                <p-button 
                    label="Cancel" 
                    icon="pi pi-times" 
                    styleClass="p-button-text" 
                    (click)="hideCreateProjectDialog()">
                </p-button>
                <p-button 
                    label="Create Project" 
                    icon="pi pi-check" 
                    (click)="saveProjectFromDevis()" 
                    [disabled]="!isProjectFormValid()">
                </p-button>
            </ng-template>
        </p-dialog>

        <p-confirmDialog></p-confirmDialog>
        <p-toast></p-toast>
    `
})
export class AdminDevis implements OnInit {
    devisList: Devis[] = [];
    devis: Devis = {
        numero: '',
        clientId: 0,
        dateCreation: new Date(),
        dateValidite: new Date(),
        montantHT: 0,
        montantTTC: 0,
        tva: 0,
        statut: 'BROUILLON'
    };
    devisDialog: boolean = false;
    createProjectDialog: boolean = false;
    loading: boolean = false;
    clients: Utilisateur[] = [];
    linkedProjects: Projet[] = [];

    selectedDevisForProject: Devis | null = null;
    newProject: Projet = {
        nom: '',
        dateDebut: new Date(),
        budget: 0,
        statut: 'PLANIFIE'
    };

    totalQuotes: number = 0;
    acceptedQuotes: number = 0;
    pendingQuotes: number = 0;
    totalValue: number = 0;

    statusOptions = [
        { label: 'Draft', value: 'BROUILLON' },
        { label: 'Sent', value: 'ENVOYE' },
        { label: 'Accepted', value: 'ACCEPTE' },
        { label: 'Refused', value: 'REFUSE' },
        { label: 'Expired', value: 'EXPIRE' }
    ];

    priorityOptions = [
        { label: 'Low', value: 'BASSE' },
        { label: 'Medium', value: 'MOYENNE' },
        { label: 'High', value: 'HAUTE' },
        { label: 'Critical', value: 'CRITIQUE' }
    ];

    constructor(
        private devisService: DevisService,
        private utilisateurService: UtilisateurService,
        private projetService: ProjetService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadDevis();
        this.loadClients();
        this.loadLinkedProjects();
    }

    loadDevis() {
        this.loading = true;
        this.devisService.getAllDevis().subscribe({
            next: (data) => {
                this.devisList = data;
                this.calculateSummary();
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading devis:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load quotes'
                });
                this.loading = false;
            }
        });
    }

    loadClients() {
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (clients) => {
                this.clients = clients;
            },
            error: (error) => {
                console.error('Error loading clients:', error);
            }
        });
    }

    loadLinkedProjects() {
        this.projetService.getAllProjets().subscribe({
            next: (projects) => {
                this.linkedProjects = projects.filter(p => p.devisId);
            },
            error: (error) => {
                console.error('Error loading linked projects:', error);
            }
        });
    }

    calculateSummary() {
        this.totalQuotes = this.devisList.length;
        this.acceptedQuotes = this.devisList.filter(d => d.statut === 'ACCEPTE').length;
        this.pendingQuotes = this.devisList.filter(d => d.statut === 'ENVOYE').length;
        this.totalValue = this.devisList
            .filter(d => d.statut === 'ACCEPTE')
            .reduce((sum, d) => sum + (d.montantTTC || 0), 0);
    }

    showDialog() {
        this.devis = {
            numero: this.generateQuoteNumber(),
            clientId: 0,
            statut: 'BROUILLON',
            dateCreation: new Date(),
            dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            tva: 20,
            montantHT: 0,
            montantTTC: 0,
            items: []
        };
        this.devisDialog = true;
    }

    hideDialog() {
        this.devisDialog = false;
        this.devis = {
            numero: '',
            clientId: 0,
            dateCreation: new Date(),
            dateValidite: new Date(),
            montantHT: 0,
            montantTTC: 0,
            tva: 0,
            statut: 'BROUILLON',
            items: []
        };
    }

    createProjectFromDevis(devis: Devis) {
        this.selectedDevisForProject = devis;
        this.newProject = {
            nom: devis.description || `Project for ${devis.numero}`,
            description: devis.description,
            dateDebut: new Date(),
            dateFin: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
            budget: devis.montantTTC || 0,
            statut: 'PLANIFIE',
            priorite: 'MOYENNE',
            progression: 0,
            clientId: devis.clientId,
            devisId: devis.id
        };
        this.createProjectDialog = true;
    }

    hideCreateProjectDialog() {
        this.createProjectDialog = false;
        this.selectedDevisForProject = null;
        this.newProject = {
            nom: '',
            dateDebut: new Date(),
            budget: 0,
            statut: 'PLANIFIE'
        };
    }

    saveProjectFromDevis() {
        if (this.isProjectFormValid()) {
            this.projetService.createProjet(this.newProject).subscribe({
                next: (createdProject) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Project created successfully from quote'
                    });
                    this.loadLinkedProjects();
                    this.hideCreateProjectDialog();
                    
                    // Ask if user wants to navigate to project management
                    this.confirmationService.confirm({
                        message: 'Project created successfully! Would you like to go to project management?',
                        header: 'Navigate to Projects',
                        icon: 'pi pi-question-circle',
                        accept: () => {
                            this.router.navigate(['/admin/projects']);
                        }
                    });
                },
                error: (error) => {
                    console.error('Error creating project:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create project'
                    });
                }
            });
        }
    }

    editDevis(devis: Devis) {
        this.devis = { ...devis };
        if (!this.devis.items) {
            this.devis.items = [];
        }
        this.devisDialog = true;
    }

    viewDevis(devis: Devis) {
        this.editDevis(devis);
        // Could implement a read-only view mode here
    }

    saveDevis() {
        if (this.isFormValid()) {
            this.calculateTotals();
            
            if (this.devis.id) {
                this.devisService.updateDevis(this.devis.id, this.devis).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Quote updated successfully'
                        });
                        this.loadDevis();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error updating devis:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update quote'
                        });
                    }
                });
            } else {
                this.devisService.createDevis(this.devis).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Quote created successfully'
                        });
                        this.loadDevis();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error creating devis:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create quote'
                        });
                    }
                });
            }
        }
    }

    deleteDevis(devis: Devis) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete quote "${devis.numero}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (devis.id) {
                    this.devisService.deleteDevis(devis.id).subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Quote deleted successfully'
                            });
                            this.loadDevis();
                        },
                        error: (error) => {
                            console.error('Error deleting devis:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete quote'
                            });
                        }
                    });
                }
            }
        });
    }

    addItem() {
        if (!this.devis.items) {
            this.devis.items = [];
        }
        this.devis.items.push({
            designation: '',
            quantite: 1,
            prixUnitaire: 0,
            montant: 0,
            description: ''
        });
    }

    removeItem(index: number) {
        if (this.devis.items) {
            this.devis.items.splice(index, 1);
            this.calculateTotals();
        }
    }

    calculateItemTotal(item: DevisItem) {
        item.montant = (item.quantite || 0) * (item.prixUnitaire || 0);
        this.calculateTotals();
    }

    calculateTotals() {
        if (this.devis.items) {
            this.devis.montantHT = this.devis.items.reduce((sum, item) => sum + (item.montant || 0), 0);
        } else {
            this.devis.montantHT = 0;
        }
        
        const tvaAmount = (this.devis.montantHT * (this.devis.tva || 0)) / 100;
        this.devis.montantTTC = this.devis.montantHT + tvaAmount;
    }

    generateQuoteNumber(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `DEV-${year}${month}${day}-${random}`;
    }

    isFormValid(): boolean {
        return !!(this.devis.numero && this.devis.clientId && this.devis.dateCreation && this.devis.dateValidite && this.devis.statut);
    }

    isProjectFormValid(): boolean {
        return !!(this.newProject.nom && this.newProject.dateDebut && this.newProject.budget);
    }

    getStatusSeverity(status: string): string {
        switch (status) {
            case 'BROUILLON': return 'info';
            case 'ENVOYE': return 'warning';
            case 'ACCEPTE': return 'success';
            case 'REFUSE': return 'danger';
            case 'EXPIRE': return 'danger';
            default: return 'info';
        }
    }

    getClientName(clientId: number): string {
        const client = this.clients.find(c => c.id === clientId);
        return client?.nom || 'Unknown Client';
    }

    isExpired(dateValidite: Date): boolean {
        return new Date(dateValidite) < new Date();
    }

    hasLinkedProject(devisId: number | undefined): boolean {
        if (!devisId) return false;
        return this.linkedProjects.some(p => p.devisId === devisId);
    }
}