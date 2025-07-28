import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
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
import { KPIService } from '../../../services/kpi.service';
import { ProjetService } from '../../../services/projet.service';
import { KPI, Projet } from '../../../models/business.models';

@Component({
    selector: 'app-admin-kpis',
    standalone: true,
    imports: [
        CommonModule, ChartModule, TableModule, CardModule, ButtonModule, TagModule,
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
                                <i class="pi pi-chart-line mr-3 text-primary"></i>KPI Dashboard
                            </h1>
                            <p class="text-muted-color text-lg">Monitor key performance indicators</p>
                        </div>
                        <div class="flex gap-2">
                            <p-button 
                                icon="pi pi-refresh" 
                                styleClass="p-button-outlined p-button-secondary"
                                (click)="loadKPIs()"
                                [loading]="loading">
                            </p-button>
                            <p-button 
                                label="New KPI" 
                                icon="pi pi-plus" 
                                (click)="showDialog()">
                            </p-button>
                        </div>
                    </div>

                    <!-- KPI Summary Cards -->
                    <div class="grid mb-4">
                        <div class="col-12 md:col-3">
                            <div class="card bg-blue-100 border-left-3 border-blue-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Performance KPIs</span>
                                        <div class="text-900 font-medium text-xl">{{ performanceKPIs }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-chart-line text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-green-100 border-left-3 border-green-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Quality KPIs</span>
                                        <div class="text-900 font-medium text-xl">{{ qualityKPIs }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-green-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-star text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-orange-100 border-left-3 border-orange-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Time KPIs</span>
                                        <div class="text-900 font-medium text-xl">{{ timeKPIs }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-clock text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-purple-100 border-left-3 border-purple-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Budget KPIs</span>
                                        <div class="text-900 font-medium text-xl">{{ budgetKPIs }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-euro text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- KPI Charts -->
                    <div class="grid mb-4">
                        <div class="col-12 lg:col-6">
                            <div class="card">
                                <h5 class="mb-4">KPI Trends</h5>
                                <p-chart type="line" [data]="kpiTrendData" [options]="chartOptions" height="300px"></p-chart>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6">
                            <div class="card">
                                <h5 class="mb-4">KPI Distribution by Type</h5>
                                <p-chart type="doughnut" [data]="kpiTypeData" [options]="doughnutOptions" height="300px"></p-chart>
                            </div>
                        </div>
                    </div>

                    <!-- KPIs Table -->
                    <p-table 
                        [value]="kpis" 
                        [paginator]="true" 
                        [rows]="10"
                        [loading]="loading"
                        [globalFilterFields]="['nom', 'description', 'type']"
                        #dt>
                        
                        <ng-template pTemplate="caption">
                            <div class="flex justify-content-between">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <input 
                                        pInputText 
                                        type="text" 
                                        (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                                        placeholder="Search KPIs..." />
                                </span>
                            </div>
                        </ng-template>

                        <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="nom">Name <p-sortIcon field="nom"></p-sortIcon></th>
                                <th pSortableColumn="type">Type <p-sortIcon field="type"></p-sortIcon></th>
                                <th pSortableColumn="valeur">Current Value <p-sortIcon field="valeur"></p-sortIcon></th>
                                <th pSortableColumn="objectif">Target <p-sortIcon field="objectif"></p-sortIcon></th>
                                <th>Progress</th>
                                <th pSortableColumn="tendance">Trend <p-sortIcon field="tendance"></p-sortIcon></th>
                                <th pSortableColumn="dateCalcul">Last Updated <p-sortIcon field="dateCalcul"></p-sortIcon></th>
                                <th>Project</th>
                                <th>Actions</th>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="body" let-kpi>
                            <tr>
                                <td>
                                    <div>
                                        <div class="font-medium">{{ kpi.nom }}</div>
                                        <div class="text-sm text-muted-color">{{ kpi.description | slice:0:40 }}{{ kpi.description?.length > 40 ? '...' : '' }}</div>
                                    </div>
                                </td>
                                <td>
                                    <p-tag 
                                        [value]="kpi.type" 
                                        [severity]="getTypeSeverity(kpi.type)">
                                    </p-tag>
                                </td>
                                <td>
                                    <span class="font-medium">{{ kpi.valeur | number:'1.2-2' }}</span>
                                    <span class="text-muted-color ml-1">{{ kpi.unite }}</span>
                                </td>
                                <td>
                                    <span>{{ kpi.objectif | number:'1.2-2' }}</span>
                                    <span class="text-muted-color ml-1">{{ kpi.unite }}</span>
                                </td>
                                <td>
                                    <div class="flex align-items-center gap-2">
                                        <div class="flex-1">
                                            <div class="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    class="h-2 rounded-full"
                                                    [class]="getProgressColor(getProgressPercentage(kpi))"
                                                    [style.width.%]="Math.min(getProgressPercentage(kpi), 100)">
                                                </div>
                                            </div>
                                        </div>
                                        <span class="text-sm">{{ getProgressPercentage(kpi) | number:'1.0-0' }}%</span>
                                    </div>
                                </td>
                                <td>
                                    <p-tag 
                                        [value]="kpi.tendance" 
                                        [severity]="getTrendSeverity(kpi.tendance)"
                                        [icon]="getTrendIcon(kpi.tendance)">
                                    </p-tag>
                                </td>
                                <td>{{ kpi.dateCalcul | date:'short' }}</td>
                                <td>{{ getProjectName(kpi.projetId) }}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <p-button 
                                            icon="pi pi-pencil" 
                                            styleClass="p-button-rounded p-button-text p-button-sm"
                                            (click)="editKPI(kpi)"
                                            pTooltip="Edit">
                                        </p-button>
                                        <p-button 
                                            icon="pi pi-trash" 
                                            styleClass="p-button-rounded p-button-text p-button-sm p-button-danger"
                                            (click)="deleteKPI(kpi)"
                                            pTooltip="Delete">
                                        </p-button>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>

                        <ng-template pTemplate="emptymessage">
                            <tr>
                                <td colspan="9" class="text-center py-4">
                                    <i class="pi pi-chart-line text-4xl text-muted-color mb-3"></i>
                                    <div class="text-muted-color">No KPIs found</div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>

        <!-- KPI Dialog -->
        <p-dialog 
            [(visible)]="kpiDialog" 
            [style]="{width: '600px'}" 
            header="KPI Details" 
            [modal]="true" 
            styleClass="p-fluid">
            
            <ng-template pTemplate="content">
                <div class="grid">
                    <div class="col-12">
                        <label for="nom">Name *</label>
                        <input 
                            pInputText 
                            id="nom" 
                            [(ngModel)]="kpi.nom" 
                            required 
                            autofocus />
                    </div>
                    
                    <div class="col-12">
                        <label for="description">Description</label>
                        <textarea 
                            pInputTextarea 
                            id="description" 
                            [(ngModel)]="kpi.description" 
                            rows="3">
                        </textarea>
                    </div>
                    
                    <div class="col-6">
                        <label for="type">Type *</label>
                        <p-dropdown 
                            id="type" 
                            [(ngModel)]="kpi.type" 
                            [options]="typeOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="unite">Unit</label>
                        <input 
                            pInputText 
                            id="unite" 
                            [(ngModel)]="kpi.unite" 
                            placeholder="e.g., %, €, hours" />
                    </div>
                    
                    <div class="col-6">
                        <label for="valeur">Current Value *</label>
                        <p-inputNumber 
                            id="valeur" 
                            [(ngModel)]="kpi.valeur" 
                            [minFractionDigits]="2">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-6">
                        <label for="objectif">Target Value</label>
                        <p-inputNumber 
                            id="objectif" 
                            [(ngModel)]="kpi.objectif" 
                            [minFractionDigits]="2">
                        </p-inputNumber>
                    </div>
                    
                    <div class="col-6">
                        <label for="tendance">Trend</label>
                        <p-dropdown 
                            id="tendance" 
                            [(ngModel)]="kpi.tendance" 
                            [options]="trendOptions" 
                            optionLabel="label" 
                            optionValue="value">
                        </p-dropdown>
                    </div>
                    
                    <div class="col-6">
                        <label for="dateCalcul">Calculation Date *</label>
                        <p-calendar 
                            id="dateCalcul" 
                            [(ngModel)]="kpi.dateCalcul" 
                            dateFormat="dd/mm/yy"
                            [showTime]="true">
                        </p-calendar>
                    </div>
                    
                    <div class="col-12">
                        <label for="projetId">Project</label>
                        <p-dropdown 
                            id="projetId" 
                            [(ngModel)]="kpi.projetId" 
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
                    (click)="saveKPI()" 
                    [disabled]="!isFormValid()">
                </p-button>
            </ng-template>
        </p-dialog>

        <p-confirmDialog></p-confirmDialog>
        <p-toast></p-toast>
    `
})
export class AdminKPIs implements OnInit {
    kpis: KPI[] = [];
    kpi: KPI = {
        nom: '',
        valeur: 0,
        dateCalcul: new Date(),
        type: 'PERFORMANCE'
    };
    kpiDialog: boolean = false;
    loading: boolean = false;
    projects: Projet[] = [];

    performanceKPIs: number = 0;
    qualityKPIs: number = 0;
    timeKPIs: number = 0;
    budgetKPIs: number = 0;

    kpiTrendData: any;
    kpiTypeData: any;
    chartOptions: any;
    doughnutOptions: any;

    Math = Math;

    typeOptions = [
        { label: 'Performance', value: 'PERFORMANCE' },
        { label: 'Quality', value: 'QUALITE' },
        { label: 'Time', value: 'TEMPS' },
        { label: 'Budget', value: 'BUDGET' }
    ];

    trendOptions = [
        { label: 'Rising', value: 'HAUSSE' },
        { label: 'Falling', value: 'BAISSE' },
        { label: 'Stable', value: 'STABLE' }
    ];

    constructor(
        private kpiService: KPIService,
        private projetService: ProjetService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadKPIs();
        this.loadProjects();
        this.initCharts();
    }

    loadKPIs() {
        this.loading = true;
        this.kpiService.getAllKPIs().subscribe({
            next: (data) => {
                this.kpis = data;
                this.calculateSummary();
                this.updateCharts();
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading KPIs:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load KPIs'
                });
                this.loading = false;
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
        this.performanceKPIs = this.kpis.filter(k => k.type === 'PERFORMANCE').length;
        this.qualityKPIs = this.kpis.filter(k => k.type === 'QUALITE').length;
        this.timeKPIs = this.kpis.filter(k => k.type === 'TEMPS').length;
        this.budgetKPIs = this.kpis.filter(k => k.type === 'BUDGET').length;
    }

    initCharts() {
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        this.doughnutOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };
    }

    updateCharts() {
        // KPI Trend Data (mock data for demonstration)
        this.kpiTrendData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Performance KPIs',
                    data: [85, 87, 89, 91, 88, 92],
                    borderColor: '#42A5F5',
                    backgroundColor: '#42A5F5',
                    tension: 0.4
                },
                {
                    label: 'Quality KPIs',
                    data: [78, 82, 85, 87, 89, 91],
                    borderColor: '#66BB6A',
                    backgroundColor: '#66BB6A',
                    tension: 0.4
                }
            ]
        };

        // KPI Type Distribution
        this.kpiTypeData = {
            labels: ['Performance', 'Quality', 'Time', 'Budget'],
            datasets: [
                {
                    data: [this.performanceKPIs, this.qualityKPIs, this.timeKPIs, this.budgetKPIs],
                    backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
                    borderWidth: 0
                }
            ]
        };
    }

    showDialog() {
        this.kpi = {
            nom: '',
            type: 'PERFORMANCE',
            tendance: 'STABLE',
            dateCalcul: new Date(),
            valeur: 0
        };
        this.kpiDialog = true;
    }

    hideDialog() {
        this.kpiDialog = false;
        this.kpi = {
            nom: '',
            valeur: 0,
            dateCalcul: new Date(),
            type: 'PERFORMANCE'
        };
    }

    editKPI(kpi: KPI) {
        this.kpi = { ...kpi };
        this.kpiDialog = true;
    }

    saveKPI() {
        if (this.isFormValid()) {
            if (this.kpi.id) {
                this.kpiService.updateKPI(this.kpi.id, this.kpi).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'KPI updated successfully'
                        });
                        this.loadKPIs();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error updating KPI:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update KPI'
                        });
                    }
                });
            } else {
                this.kpiService.createKPI(this.kpi).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'KPI created successfully'
                        });
                        this.loadKPIs();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error creating KPI:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create KPI'
                        });
                    }
                });
            }
        }
    }

    deleteKPI(kpi: KPI) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete KPI "${kpi.nom}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (kpi.id) {
                    this.kpiService.deleteKPI(kpi.id).subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'KPI deleted successfully'
                            });
                            this.loadKPIs();
                        },
                        error: (error) => {
                            console.error('Error deleting KPI:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete KPI'
                            });
                        }
                    });
                }
            }
        });
    }

    isFormValid(): boolean {
        return !!(this.kpi.nom && this.kpi.type && this.kpi.valeur !== undefined && this.kpi.dateCalcul);
    }

    getTypeSeverity(type: string): string {
        switch (type) {
            case 'PERFORMANCE': return 'info';
            case 'QUALITE': return 'success';
            case 'TEMPS': return 'warning';
            case 'BUDGET': return 'danger';
            default: return 'info';
        }
    }

    getTrendSeverity(trend: string): string {
        switch (trend) {
            case 'HAUSSE': return 'success';
            case 'BAISSE': return 'danger';
            case 'STABLE': return 'info';
            default: return 'info';
        }
    }

    getTrendIcon(trend: string): string {
        switch (trend) {
            case 'HAUSSE': return 'pi pi-arrow-up';
            case 'BAISSE': return 'pi pi-arrow-down';
            case 'STABLE': return 'pi pi-minus';
            default: return 'pi pi-minus';
        }
    }

    getProgressPercentage(kpi: KPI): number {
        if (!kpi.objectif || kpi.objectif === 0) return 0;
        return (kpi.valeur / kpi.objectif) * 100;
    }

    getProgressColor(percentage: number): string {
        if (percentage >= 90) return 'bg-green-500';
        if (percentage >= 70) return 'bg-yellow-500';
        if (percentage >= 50) return 'bg-orange-500';
        return 'bg-red-500';
    }

    getProjectName(projectId?: number): string {
        if (!projectId) return 'Global';
        const project = this.projects.find(p => p.id === projectId);
        return project?.nom || 'Unknown Project';
    }
}