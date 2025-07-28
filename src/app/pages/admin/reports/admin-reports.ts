import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { TransactionService } from '../../../services/transaction.service';
import { ProjetService } from '../../../services/projet.service';
import { DevisService } from '../../../services/devis.service';

interface ReportData {
  period: string;
  users: number;
  projects: number;
  revenue: number;
  quotes: number;
}

@Component({
    selector: 'app-admin-reports',
    standalone: true,
    imports: [
        CommonModule, ChartModule, TableModule, CardModule, ButtonModule, 
        TagModule, CalendarModule, DropdownModule, FormsModule
    ],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <div class="flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                                <i class="pi pi-chart-bar mr-3 text-primary"></i>System Reports
                            </h1>
                            <p class="text-muted-color text-lg">Comprehensive business analytics and reports</p>
                        </div>
                        <div class="flex gap-2">
                            <p-button 
                                icon="pi pi-refresh" 
                                styleClass="p-button-outlined p-button-secondary"
                                (click)="loadReports()"
                                [loading]="loading">
                            </p-button>
                            <p-button 
                                label="Export PDF" 
                                icon="pi pi-file-pdf" 
                                styleClass="p-button-outlined"
                                (click)="exportToPDF()">
                            </p-button>
                        </div>
                    </div>

                    <!-- Report Filters -->
                    <div class="grid mb-4">
                        <div class="col-12 md:col-4">
                            <label for="reportType">Report Type</label>
                            <p-dropdown 
                                id="reportType" 
                                [(ngModel)]="selectedReportType" 
                                [options]="reportTypes" 
                                optionLabel="label" 
                                optionValue="value"
                                (onChange)="onReportTypeChange()">
                            </p-dropdown>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="dateFrom">From Date</label>
                            <p-calendar 
                                id="dateFrom" 
                                [(ngModel)]="dateFrom" 
                                dateFormat="dd/mm/yy"
                                (onSelect)="onDateChange()">
                            </p-calendar>
                        </div>
                        <div class="col-12 md:col-4">
                            <label for="dateTo">To Date</label>
                            <p-calendar 
                                id="dateTo" 
                                [(ngModel)]="dateTo" 
                                dateFormat="dd/mm/yy"
                                (onSelect)="onDateChange()">
                            </p-calendar>
                        </div>
                    </div>

                    <!-- Executive Summary -->
                    <div class="grid mb-4">
                        <div class="col-12">
                            <div class="card bg-primary text-white">
                                <h5 class="mb-4 text-white">Executive Summary</h5>
                                <div class="grid">
                                    <div class="col-12 md:col-3 text-center">
                                        <div class="text-2xl font-bold mb-2">{{ totalUsers }}</div>
                                        <div class="text-primary-100">Total Users</div>
                                    </div>
                                    <div class="col-12 md:col-3 text-center">
                                        <div class="text-2xl font-bold mb-2">{{ totalProjects }}</div>
                                        <div class="text-primary-100">Active Projects</div>
                                    </div>
                                    <div class="col-12 md:col-3 text-center">
                                        <div class="text-2xl font-bold mb-2">€{{ totalRevenue | number:'1.2-2' }}</div>
                                        <div class="text-primary-100">Total Revenue</div>
                                    </div>
                                    <div class="col-12 md:col-3 text-center">
                                        <div class="text-2xl font-bold mb-2">{{ totalQuotes }}</div>
                                        <div class="text-primary-100">Quotes Generated</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Charts Section -->
                    <div class="grid mb-4" *ngIf="selectedReportType === 'overview'">
                        <div class="col-12 lg:col-6">
                            <div class="card">
                                <h5 class="mb-4">Revenue Trend</h5>
                                <p-chart type="line" [data]="revenueChartData" [options]="chartOptions" height="300px"></p-chart>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6">
                            <div class="card">
                                <h5 class="mb-4">Project Status Distribution</h5>
                                <p-chart type="pie" [data]="projectStatusData" [options]="pieOptions" height="300px"></p-chart>
                            </div>
                        </div>
                    </div>

                    <!-- User Analytics -->
                    <div class="grid mb-4" *ngIf="selectedReportType === 'users'">
                        <div class="col-12 lg:col-8">
                            <div class="card">
                                <h5 class="mb-4">User Registration Trend</h5>
                                <p-chart type="bar" [data]="userRegistrationData" [options]="chartOptions" height="300px"></p-chart>
                            </div>
                        </div>
                        <div class="col-12 lg:col-4">
                            <div class="card">
                                <h5 class="mb-4">User Roles</h5>
                                <p-chart type="doughnut" [data]="userRoleData" [options]="doughnutOptions" height="300px"></p-chart>
                            </div>
                        </div>
                    </div>

                    <!-- Financial Reports -->
                    <div class="grid mb-4" *ngIf="selectedReportType === 'financial'">
                        <div class="col-12">
                            <div class="card">
                                <h5 class="mb-4">Financial Overview</h5>
                                <div class="grid">
                                    <div class="col-12 md:col-4">
                                        <div class="card bg-green-100 border-left-3 border-green-500">
                                            <div class="text-center">
                                                <div class="text-2xl font-bold text-green-600 mb-2">€{{ totalCredits | number:'1.2-2' }}</div>
                                                <div class="text-green-700">Total Credits</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="card bg-red-100 border-left-3 border-red-500">
                                            <div class="text-center">
                                                <div class="text-2xl font-bold text-red-600 mb-2">€{{ totalDebits | number:'1.2-2' }}</div>
                                                <div class="text-red-700">Total Debits</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="card bg-blue-100 border-left-3 border-blue-500">
                                            <div class="text-center">
                                                <div class="text-2xl font-bold text-blue-600 mb-2">€{{ netBalance | number:'1.2-2' }}</div>
                                                <div class="text-blue-700">Net Balance</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p-chart type="line" [data]="financialTrendData" [options]="chartOptions" height="300px"></p-chart>
                            </div>
                        </div>
                    </div>

                    <!-- Detailed Data Table -->
                    <div class="card">
                        <h5 class="mb-4">Detailed Report Data</h5>
                        <p-table 
                            [value]="reportData" 
                            [paginator]="true" 
                            [rows]="10"
                            [loading]="loading"
                            exportFilename="report-data">
                            
                            <ng-template pTemplate="header">
                                <tr>
                                    <th pSortableColumn="period">Period <p-sortIcon field="period"></p-sortIcon></th>
                                    <th pSortableColumn="users">Users <p-sortIcon field="users"></p-sortIcon></th>
                                    <th pSortableColumn="projects">Projects <p-sortIcon field="projects"></p-sortIcon></th>
                                    <th pSortableColumn="revenue">Revenue <p-sortIcon field="revenue"></p-sortIcon></th>
                                    <th pSortableColumn="quotes">Quotes <p-sortIcon field="quotes"></p-sortIcon></th>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="body" let-data>
                                <tr>
                                    <td>{{ data.period }}</td>
                                    <td>{{ data.users | number }}</td>
                                    <td>{{ data.projects | number }}</td>
                                    <td>€{{ data.revenue | number:'1.2-2' }}</td>
                                    <td>{{ data.quotes | number }}</td>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="emptymessage">
                                <tr>
                                    <td colspan="5" class="text-center py-4">
                                        <i class="pi pi-chart-bar text-4xl text-muted-color mb-3"></i>
                                        <div class="text-muted-color">No report data available</div>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AdminReports implements OnInit {
    loading: boolean = false;
    selectedReportType: string = 'overview';
    dateFrom: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    dateTo: Date = new Date();

    // Summary data
    totalUsers: number = 0;
    totalProjects: number = 0;
    totalRevenue: number = 0;
    totalQuotes: number = 0;
    totalCredits: number = 0;
    totalDebits: number = 0;
    netBalance: number = 0;

    // Chart data
    revenueChartData: any;
    projectStatusData: any;
    userRegistrationData: any;
    userRoleData: any;
    financialTrendData: any;
    
    // Chart options
    chartOptions: any;
    pieOptions: any;
    doughnutOptions: any;

    reportData: ReportData[] = [];

    reportTypes = [
        { label: 'Overview', value: 'overview' },
        { label: 'Users', value: 'users' },
        { label: 'Financial', value: 'financial' },
        { label: 'Projects', value: 'projects' }
    ];

    constructor(
        private utilisateurService: UtilisateurService,
        private transactionService: TransactionService,
        private projetService: ProjetService,
        private devisService: DevisService
    ) {}

    ngOnInit() {
        this.initChartOptions();
        this.loadReports();
    }

    initChartOptions() {
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

        this.pieOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
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

    loadReports() {
        this.loading = true;
        
        // Load all data concurrently
        Promise.all([
            this.loadUserData(),
            this.loadProjectData(),
            this.loadTransactionData(),
            this.loadQuoteData()
        ]).then(() => {
            this.generateChartData();
            this.generateReportData();
            this.loading = false;
        }).catch(error => {
            console.error('Error loading report data:', error);
            this.loading = false;
        });
    }

    async loadUserData() {
        try {
            const users = await this.utilisateurService.getAllUtilisateurs().toPromise();
            this.totalUsers = users?.length || 0;
            
            // Generate user role data
            const roleCount = users?.reduce((acc: any, user) => {
                acc[user.role || 'Unknown'] = (acc[user.role || 'Unknown'] || 0) + 1;
                return acc;
            }, {}) || {};

            this.userRoleData = {
                labels: Object.keys(roleCount),
                datasets: [{
                    data: Object.values(roleCount),
                    backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
                    borderWidth: 0
                }]
            };

            // Generate user registration trend (mock data)
            this.userRegistrationData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [12, 19, 15, 25, 22, 30],
                    backgroundColor: '#42A5F5',
                    borderColor: '#42A5F5'
                }]
            };
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async loadProjectData() {
        try {
            const projects = await this.projetService.getAllProjets().toPromise();
            this.totalProjects = projects?.filter(p => p.statut === 'EN_COURS').length || 0;
            
            // Generate project status data
            const statusCount = projects?.reduce((acc: any, project) => {
                acc[project.statut || 'Unknown'] = (acc[project.statut || 'Unknown'] || 0) + 1;
                return acc;
            }, {}) || {};

            this.projectStatusData = {
                labels: Object.keys(statusCount),
                datasets: [{
                    data: Object.values(statusCount),
                    backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
                    borderWidth: 0
                }]
            };
        } catch (error) {
            console.error('Error loading project data:', error);
        }
    }

    async loadTransactionData() {
        try {
            const transactions = await this.transactionService.getAllTransactions().toPromise();
            
            this.totalCredits = transactions?.filter(t => t.type === 'CREDIT' && t.statut === 'COMPLETED')
                .reduce((sum, t) => sum + (t.montant || 0), 0) || 0;
            
            this.totalDebits = transactions?.filter(t => t.type === 'DEBIT' && t.statut === 'COMPLETED')
                .reduce((sum, t) => sum + (t.montant || 0), 0) || 0;
            
            this.netBalance = this.totalCredits - this.totalDebits;
            this.totalRevenue = this.totalCredits;

            // Generate financial trend data (mock data)
            this.financialTrendData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Credits',
                        data: [15000, 18000, 22000, 25000, 28000, 32000],
                        borderColor: '#66BB6A',
                        backgroundColor: '#66BB6A',
                        tension: 0.4
                    },
                    {
                        label: 'Debits',
                        data: [8000, 9500, 11000, 12500, 14000, 15500],
                        borderColor: '#EF5350',
                        backgroundColor: '#EF5350',
                        tension: 0.4
                    }
                ]
            };
        } catch (error) {
            console.error('Error loading transaction data:', error);
        }
    }

    async loadQuoteData() {
        try {
            const quotes = await this.devisService.getAllDevis().toPromise();
            this.totalQuotes = quotes?.length || 0;
        } catch (error) {
            console.error('Error loading quote data:', error);
        }
    }

    generateChartData() {
        // Revenue chart data (mock data)
        this.revenueChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [15000, 18000, 22000, 25000, 28000, 32000],
                borderColor: '#42A5F5',
                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
    }

    generateReportData() {
        // Generate mock report data for the table
        this.reportData = [
            { period: 'January 2024', users: 150, projects: 12, revenue: 15000, quotes: 25 },
            { period: 'February 2024', users: 165, projects: 15, revenue: 18000, quotes: 30 },
            { period: 'March 2024', users: 180, projects: 18, revenue: 22000, quotes: 35 },
            { period: 'April 2024', users: 195, projects: 20, revenue: 25000, quotes: 40 },
            { period: 'May 2024', users: 210, projects: 22, revenue: 28000, quotes: 45 },
            { period: 'June 2024', users: 225, projects: 24, revenue: 32000, quotes: 50 }
        ];
    }

    onReportTypeChange() {
        this.loadReports();
    }

    onDateChange() {
        this.loadReports();
    }

    exportToPDF() {
        // Implement PDF export functionality
        console.log('Exporting to PDF...');
        // You could use libraries like jsPDF or pdfmake here
    }
}