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
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjetService } from '../../../services/projet.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Projet, Utilisateur } from '../../../models/business.models';

@Component({
    selector: 'app-admin-projects',
    standalone: true,
    imports: [
        CommonModule, TableModule, CardModule, ButtonModule, TagModule,
        DialogModule, InputTextModule, InputTextarea, InputNumberModule,
        DropdownModule, CalendarModule, ProgressBarModule, ConfirmDialogModule,
        ToastModule, FormsModule
    ],
    providers: [ConfirmationService, MessageService],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <div class="flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                                <i class="pi pi-briefcase mr-3 text-primary"></i>Project Management
                            </h1>
                            <p class="text-muted-color text-lg">Manage all projects and their status</p>
                        </div>
                        <div class="flex gap-2">
                            <p-button 
                                icon="pi pi-refresh" 
                                styleClass="p-button-outlined p-button-secondary"
                                (click)="loadProjects()"
                                [loading]="loading">
                            </p-button>
                            <p-button 
                                label="New Project" 
                                icon="pi pi-plus" 
                                (click)="showDialog()">
                            </p-button>
                        </div>
                    </div>

                    <!-- Projects Table -->
                    <p-table 
                        [value]="projects" 
                        [paginator]="true" 
                        [rows]="10"
                        [loading]="loading"
                        [globalFilterFields]="['nom', 'description', 'statut']"
                        #dt>
                        
                        <ng-template pTemplate="caption">
                            <div class="flex justify-content-between">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <input 
                                        pInputText 
                                        type="text" 
                                        (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                                        placeholder="Search projects..." />
                                </span>
                            </div>
                        </ng-template>

                        <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="nom">Name <p-sortIcon field="nom"></p-sortIcon></th>
                                <th pSortableColumn="dateDebut">Start Date <p-sortIcon field="dateDebut"></p-sortIcon></th>
                                <th pSortableColumn="dateFin">End Date <p-sortIcon field="dateFin"></p-sortIcon></th>
                                <th pSortableColumn="budget">Budget <p-sortIcon field="budget"></p-sortIcon></th>
                                <th pSortableColumn="statut">Status <p-sortIcon field="statut"></p-sortIcon></th>
                                <th pSortableColumn="progression">Progress <p-sortIcon field="progression"></p-sortIcon></th>
                                <th pSortableColumn="priorite">Priority <p-sortIcon field="priorite"></p-sortIcon></th>
                                <th>Actions</th>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="body" let-project>
                            <tr>
                                <td>
                                    <div>
                                        <div class="font-medium">{{ project.nom }}</div>
                                        <div class="text-sm text-muted-color">{{ project.description | slice:0:50 }}{{ project.description?.length > 50 ? '...' : '' }}</div>
                                    </div>
                                </td>
                                <td>{{ project.dateDebut | date:'short' }}</td>
                                <td>{{ project.dateFin | date:'short' }}</td>
                                <td>€{{ project.budget | number:'1.2-2' }}</td>
                                <td>
                                    <p-tag 
                                        [value]="project.statut" 
                                        [severity]="getStatusSeverity(project.statut)">
                                    </p-tag>
                                </td>
                                <td>
                                    <div class="flex align-items-center gap-2">
                                        <p-progressBar 
                                            [value]="project.progression || 0" 
                                            [style]="{'width': '100px', 'height': '8px'}">
                                        </p-progressBar>
                                        <span class="text-sm">{{ project.progression || 0 }}%</span>
                                    </div>
                                </td>
                                <td>
                                    <p-tag 
                                        [value]="project.priorite" 
                                        [severity]="getPrioritySeverity(project.priorite)">
                                    </p-tag>
                                </td>
                                <td>
                                    <div class="flex gap-2">
                                        <p-button 
                                            icon="pi pi-pencil" 
                                            styleClass="p-button-rounded p-button-text p-button-sm"
                                            (click)="editProject(project)"
                                            pTooltip="Edit">
                                        </p-button>
                                        <p-button 
                                            icon="pi pi-trash" 
                                            styleClass="p-button-rounded p-button-text p-button-sm p-button-danger"
                                            (click)="deleteProject(project)"
                                            pTooltip="Delete">
                                        </p-button>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="emptymessage">
                            <tr>
                                <td colspan="8" class="text-center py-4">
                                    <i class="pi pi-briefcase text-4xl text-muted-color mb-3"></i>
                                    <div class="text-muted-color">No projects found</div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>

        <!-- Project Dialog -->
        <p-dialog 
            [(visible)]="projectDialog" 
            [style]="{width: '600px'}" 
            header="Project Details" 
            [modal]="true" 
            styleClass="p-fluid">
            
            <ng-template pTemplate="content">
                <div class="grid">
                    <div class="col-12">
                        <label for="nom">Name *</label>
                        <input 
                            pInputText 
                            id="nom" 
                            [(ngModel)]="project.nom" 
                            required 
                            autofocus />
                    </div>
                    
                    <div class="col-12">
                        <label for="description">Description</label>
                        <textarea 
                            pInputTextarea 
                            id="description" 
                            [(ngModel)]="project.description" 
                            rows="3">
                        </textarea>
                    </div>
                    
                    <div class="col-6">
                        <label for="dateDebut">Start Date *</label>
                        <p-calendar 
                            id="dateDebut" 
                            [(ngModel)]="project.dateDebut" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="dateFin">End Date</label>
                        <p-calendar 
                            id="dateFin" 
                            [(ngModel)]="project.dateFin" 
                            dateFormat="dd/mm/yy">
                        </p-calendar>
                    </div>
                    
                    <div class="col-6">
                        <label for="budget">Budget *</label>
                        <p-inputNumber 
                            id="budget" 
                            [(ngModel)]="project.budget" 
                            mode="currency" 
                            currency="EUR" 
                            locale="fr-FR">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-6">
                        <label for="progression">Progress (%)</label>
                        <p-inputNumber 
                            id="progression" 
                            [(ngModel)]="project.progression" 
                            [min]="0" 
                            [max]="100">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-6">
                        <label for="statut">Status *</label>
                        <p-dropdown 
                            id="statut" 
                            [(ngModel)]="project.statut" 
                            [options]="statusOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="priorite">Priority</label>
                        <p-dropdown 
                            id="priorite" 
                            [(ngModel)]="project.priorite" 
                            [options]="priorityOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="clientId">Client</label>
                        <p-dropdown 
                            id="clientId" 
                            [(ngModel)]="project.clientId" 
                            [options]="clients" 
                            optionLabel="nom" 
                            optionValue="id"
                            placeholder="Select a client">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="responsableId">Responsible</label>
                        <p-dropdown 
                            id="responsableId" 
                            [(ngModel)]="project.responsableId" 
                            [options]="responsables" 
                            optionLabel="nom" 
                            optionValue="id"
                            placeholder="Select responsible">
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
                    (click)="saveProject()" 
                    [disabled]="!isFormValid()">
                </p-button>
            </ng-template>
        </p-dialog>

        <p-confirmDialog></p-confirmDialog>
        <p-toast></p-toast>
    `
})
export class AdminProjects implements OnInit {
    projects: Projet[] = [];
    project: Projet = {
        nom: '',
        dateDebut: new Date(),
        budget: 0,
        statut: 'PLANIFIE'
    };
    projectDialog: boolean = false;
    loading: boolean = false;
    clients: Utilisateur[] = [];
    responsables: Utilisateur[] = [];

    statusOptions = [
        { label: 'Planned', value: 'PLANIFIE' },
        { label: 'In Progress', value: 'EN_COURS' },
        { label: 'Completed', value: 'TERMINE' },
        { label: 'Suspended', value: 'SUSPENDU' }
    ];

    priorityOptions = [
        { label: 'Low', value: 'BASSE' },
        { label: 'Medium', value: 'MOYENNE' },
        { label: 'High', value: 'HAUTE' },
        { label: 'Critical', value: 'CRITIQUE' }
    ];

    constructor(
        private projetService: ProjetService,
        private utilisateurService: UtilisateurService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadProjects();
        this.loadUsers();
    }

    loadProjects() {
        this.loading = true;
        this.projetService.getAllProjets().subscribe({
            next: (data) => {
                this.projects = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load projects'
                });
                this.loading = false;
            }
        });
    }

    loadUsers() {
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (users) => {
                this.clients = users.filter(u => u.role === 'CLIENT');
                this.responsables = users.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER');
            },
            error: (error) => {
                console.error('Error loading users:', error);
            }
        });
    }

    showDialog() {
        this.project = {
            nom: '',
            dateDebut: new Date(),
            budget: 0,
            statut: 'PLANIFIE',
            priorite: 'MOYENNE',
            progression: 0
        };
        this.projectDialog = true;
    }

    hideDialog() {
        this.projectDialog = false;
        this.project = {
            nom: '',
            dateDebut: new Date(),
            budget: 0,
            statut: 'PLANIFIE'
        };
    }

    editProject(project: Projet) {
        this.project = { ...project };
        this.projectDialog = true;
    }

    saveProject() {
        if (this.isFormValid()) {
            if (this.project.id) {
                this.projetService.updateProjet(this.project.id, this.project).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Project updated successfully'
                        });
                        this.loadProjects();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error updating project:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update project'
                        });
                    }
                });
            } else {
                this.projetService.createProjet(this.project).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Project created successfully'
                        });
                        this.loadProjects();
                        this.hideDialog();
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
    }

    deleteProject(project: Projet) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete project "${project.nom}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (project.id) {
                    this.projetService.deleteProjet(project.id).subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Project deleted successfully'
                            });
                            this.loadProjects();
                        },
                        error: (error) => {
                            console.error('Error deleting project:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete project'
                            });
                        }
                    });
                }
            }
        });
    }

    isFormValid(): boolean {
        return !!(this.project.nom && this.project.dateDebut && this.project.budget && this.project.statut);
    }

    getStatusSeverity(status: string): string {
        switch (status) {
            case 'PLANIFIE': return 'info';
            case 'EN_COURS': return 'warning';
            case 'TERMINE': return 'success';
            case 'SUSPENDU': return 'danger';
            default: return 'info';
        }
    }

    getPrioritySeverity(priority: string): string {
        switch (priority) {
            case 'BASSE': return 'success';
            case 'MOYENNE': return 'info';
            case 'HAUTE': return 'warning';
            case 'CRITIQUE': return 'danger';
            default: return 'info';
        }
    }
}