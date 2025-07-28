import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { TransactionService } from '../../services/transaction.service';
import { ProjetService } from '../../services/projet.service';
import { DevisService } from '../../services/devis.service';
import { KPIService } from '../../services/kpi.service';

interface SiteStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalSessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  userGrowth: number;
  activeProjects: number;
  projectGrowth: number;
  revenue: number;
  revenueGrowth: number;
  satisfaction: number;
  satisfactionGrowth: number;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'danger';
}

interface TopPage {
  page: string;
  views: number;
  uniqueViews: number;
  bounceRate: number;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, ChartModule, TableModule, CardModule, ButtonModule, TagModule, RouterModule],
    template: `
        <div class="grid">
            <!-- Header -->
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex align-items-center justify-content-between mb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                                <i class="pi pi-chart-line mr-3 text-primary"></i>Admin Dashboard
                            </h1>
                            <p class="text-muted-color text-lg">Welcome back! Here's what's happening with your platform today.</p>
                        </div>
                        <div class="flex gap-2">
                            <p-button 
                                icon="pi pi-refresh" 
                                styleClass="p-button-outlined p-button-secondary"
                                (click)="refreshData()"
                                [loading]="loading">
                            </p-button>
                            <p-button 
                                icon="pi pi-cog" 
                                styleClass="p-button-outlined"
                                routerLink="/admin/settings">
                            </p-button>
                        </div>
                    </div>
                    
                    <!-- Quick Stats Cards -->
                    <div class="grid">
                        <div class="col-12 md:col-3">
                            <div class="card bg-blue-100 border-left-3 border-blue-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Users</span>
                                        <div class="text-900 font-medium text-xl">{{ siteStats.totalUsers }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-users text-white text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">{{ siteStats.userGrowth }}% </span>
                                <span class="text-500">since last month</span>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-orange-100 border-left-3 border-orange-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Active Projects</span>
                                        <div class="text-900 font-medium text-xl">{{ siteStats.activeProjects }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-briefcase text-white text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">{{ siteStats.projectGrowth }}% </span>
                                <span class="text-500">completion rate</span>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-cyan-100 border-left-3 border-cyan-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Revenue</span>
                                        <div class="text-900 font-medium text-xl">€{{ siteStats.revenue | number:'1.0-0' }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-cyan-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-euro text-white text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">+{{ siteStats.revenueGrowth }}% </span>
                                <span class="text-500">since last month</span>
                            </div>
                        </div>
                        <div class="col-12 md:col-3">
                            <div class="card bg-purple-100 border-left-3 border-purple-500">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Satisfaction</span>
                                        <div class="text-900 font-medium text-xl">{{ siteStats.satisfaction }}%</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-500 border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-heart text-white text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">+{{ siteStats.satisfactionGrowth }}% </span>
                                <span class="text-500">client rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="col-12 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Total Users</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ siteStats.totalUsers | number }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-blue-100 dark:bg-blue-400/10 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-users text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">{{ siteStats.newUsersToday }} new </span>
                    <span class="text-muted-color">today</span>
                </div>
            </div>

            <div class="col-12 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Active Sessions</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ siteStats.activeUsers | number }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-green-100 dark:bg-green-400/10 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-circle text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">{{ siteStats.totalSessions }} total </span>
                    <span class="text-muted-color">sessions today</span>
                </div>
            </div>

            <div class="col-12 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Page Views</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ siteStats.pageViews | number }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-orange-100 dark:bg-orange-400/10 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-eye text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">{{ siteStats.bounceRate }}% </span>
                    <span class="text-muted-color">bounce rate</span>
                </div>
            </div>

            <div class="col-12 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Avg. Session</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ siteStats.avgSessionDuration }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-purple-100 dark:bg-purple-400/10 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-clock text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">+12% </span>
                    <span class="text-muted-color">from last week</span>
                </div>
            </div>

            <!-- Traffic Chart -->
            <div class="col-12 lg:col-8">
                <div class="card">
                    <h5 class="mb-4">Website Traffic</h5>
                    <p-chart type="line" [data]="trafficData" [options]="trafficOptions" height="300px"></p-chart>
                </div>
            </div>

            <!-- User Distribution -->
            <div class="col-12 lg:col-4">
                <div class="card">
                    <h5 class="mb-4">User Types</h5>
                    <p-chart type="doughnut" [data]="userTypeData" [options]="userTypeOptions" height="300px"></p-chart>
                </div>
            </div>

            <!-- Top Pages -->
            <div class="col-12 lg:col-6">
                <div class="card">
                    <h5 class="mb-4">Top Pages</h5>
                    <p-table [value]="topPages" [paginator]="false">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Page</th>
                                <th>Views</th>
                                <th>Unique</th>
                                <th>Bounce Rate</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-page>
                            <tr>
                                <td>{{ page.page }}</td>
                                <td>{{ page.views | number }}</td>
                                <td>{{ page.uniqueViews | number }}</td>
                                <td>
                                    <p-tag 
                                        [value]="page.bounceRate + '%'" 
                                        [severity]="page.bounceRate > 70 ? 'danger' : page.bounceRate > 50 ? 'warning' : 'success'">
                                    </p-tag>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="col-12 lg:col-6">
                <div class="card">
                    <h5 class="mb-4">Recent Activity</h5>
                    <p-table [value]="recentActivity" [paginator]="false">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>User</th>
                                <th>Action</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-activity>
                            <tr>
                                <td>{{ activity.user }}</td>
                                <td>{{ activity.action }}</td>
                                <td>{{ activity.timestamp | date:'short' }}</td>
                                <td>
                                    <p-tag 
                                        [value]="activity.status" 
                                        [severity]="activity.status">
                                    </p-tag>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="col-12">
                <div class="card">
                    <h5 class="mb-4">Quick Actions & Management</h5>
                    <div class="grid">
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="Manage Users" 
                                icon="pi pi-users" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/users">
                            </p-button>
                        </div>
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="Manage Projects" 
                                icon="pi pi-briefcase" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/projects">
                            </p-button>
                        </div>
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="Manage Transactions" 
                                icon="pi pi-credit-card" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/transactions">
                            </p-button>
                        </div>
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="Manage Quotes" 
                                icon="pi pi-file-edit" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/devis">
                            </p-button>
                        </div>
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="KPI Dashboard" 
                                icon="pi pi-chart-line" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/kpis">
                            </p-button>
                        </div>
                        <div class="col-12 md:col-6 lg:col-4">
                            <p-button 
                                label="System Reports" 
                                icon="pi pi-chart-bar" 
                                styleClass="p-button-outlined w-full"
                                routerLink="/admin/reports">
                            </p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AdminDashboard implements OnInit {
    loading: boolean = false;

    siteStats: SiteStats = {
        totalUsers: 15847,
        activeUsers: 342,
        newUsersToday: 28,
        totalSessions: 1256,
        pageViews: 8934,
        bounceRate: 34.2,
        avgSessionDuration: '3m 42s',
        userGrowth: 12.5,
        activeProjects: 24,
        projectGrowth: 85.2,
        revenue: 125000,
        revenueGrowth: 18.7,
        satisfaction: 94.2,
        satisfactionGrowth: 5.3
    };

    recentActivity: RecentActivity[] = [
        { id: 1, user: 'John Doe', action: 'User Registration', timestamp: new Date(Date.now() - 300000), status: 'success' },
        { id: 2, user: 'Jane Smith', action: 'Password Reset', timestamp: new Date(Date.now() - 600000), status: 'warning' },
        { id: 3, user: 'Admin', action: 'System Backup', timestamp: new Date(Date.now() - 900000), status: 'success' },
        { id: 4, user: 'Mike Johnson', action: 'Failed Login', timestamp: new Date(Date.now() - 1200000), status: 'danger' },
        { id: 5, user: 'Sarah Wilson', action: 'Profile Update', timestamp: new Date(Date.now() - 1500000), status: 'success' }
    ];

    topPages: TopPage[] = [
        { page: '/landing', views: 2847, uniqueViews: 2156, bounceRate: 28.5 },
        { page: '/services', views: 1923, uniqueViews: 1654, bounceRate: 42.1 },
        { page: '/portfolio', views: 1456, uniqueViews: 1234, bounceRate: 35.8 },
        { page: '/about', views: 987, uniqueViews: 876, bounceRate: 51.2 },
        { page: '/calculator', views: 654, uniqueViews: 543, bounceRate: 67.3 }
    ];

    trafficData: any;
    trafficOptions: any;
    userTypeData: any;
    userTypeOptions: any;

    constructor(
        private authService: AuthService,
        private utilisateurService: UtilisateurService,
        private transactionService: TransactionService,
        private projetService: ProjetService,
        private devisService: DevisService,
        private kpiService: KPIService
    ) {}

    ngOnInit() {
        this.initCharts();
        this.loadRealData();
    }

    refreshData() {
        this.loading = true;
        // Simulate API call
        setTimeout(() => {
            this.loading = false;
            this.loadRealData();
        }, 2000);
    }

    loadRealData() {
        // Load real statistics from services
        this.loadUserStats();
        this.loadProjectStats();
        this.loadTransactionStats();
        this.loadDevisStats();
        this.loadRecentActivity();
    }

    loadUserStats() {
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (users) => {
                this.siteStats.totalUsers = users.length;
                this.siteStats.activeUsers = users.filter(u => u.isActive).length;
                this.siteStats.newUsersToday = users.filter(u => {
                    const today = new Date();
                    const userDate = new Date(u.dateCreation || '');
                    return userDate.toDateString() === today.toDateString();
                }).length;
                
                // Calculate user growth (mock calculation)
                this.siteStats.userGrowth = Math.round((this.siteStats.newUsersToday / this.siteStats.totalUsers) * 100 * 30); // Monthly estimate
            },
            error: (error) => {
                console.error('Error loading user stats:', error);
                // Keep mock data if API fails
            }
        });
    }

    loadProjectStats() {
        this.projetService.getAllProjets().subscribe({
            next: (projects) => {
                this.siteStats.activeProjects = projects.filter(p => p.statut === 'EN_COURS').length;
                const totalProjects = projects.length;
                const completedProjects = projects.filter(p => p.statut === 'TERMINE').length;
                this.siteStats.projectGrowth = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
            },
            error: (error) => {
                console.error('Error loading project stats:', error);
                // Keep mock data if API fails
            }
        });
    }

    loadTransactionStats() {
        this.transactionService.getAllTransactions().subscribe({
            next: (transactions) => {
                const completedTransactions = transactions.filter(t => t.statut === 'COMPLETED');
                const creditTransactions = completedTransactions.filter(t => t.type === 'CREDIT');
                this.siteStats.revenue = creditTransactions.reduce((sum, t) => sum + (t.montant || 0), 0);
                
                // Calculate revenue growth (mock calculation)
                const lastMonthRevenue = this.siteStats.revenue * 0.85; // Assume 15% growth
                this.siteStats.revenueGrowth = Math.round(((this.siteStats.revenue - lastMonthRevenue) / lastMonthRevenue) * 100);
            },
            error: (error) => {
                console.error('Error loading transaction stats:', error);
                // Keep mock data if API fails
            }
        });
    }

    loadDevisStats() {
        this.devisService.getAllDevis().subscribe({
            next: (devis) => {
                const acceptedDevis = devis.filter(d => d.statut === 'ACCEPTE');
                const totalDevis = devis.length;
                this.siteStats.satisfaction = totalDevis > 0 ? Math.round((acceptedDevis.length / totalDevis) * 100) : 94.2;
                this.siteStats.satisfactionGrowth = 5.3; // Mock growth
            },
            error: (error) => {
                console.error('Error loading devis stats:', error);
                // Keep mock data if API fails
            }
        });
    }

    loadRecentActivity() {
        // Load real recent activity from multiple sources
        this.recentActivity = [];
        
        // Get recent users
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: (users) => {
                const recentUsers = users
                    .filter(u => u.dateCreation)
                    .sort((a, b) => new Date(b.dateCreation!).getTime() - new Date(a.dateCreation!).getTime())
                    .slice(0, 3);
                
                recentUsers.forEach((user, index) => {
                    this.recentActivity.push({
                        id: this.recentActivity.length + 1,
                        user: user.nom || 'Unknown User',
                        action: 'User Registration',
                        timestamp: new Date(user.dateCreation!),
                        status: 'success'
                    });
                });
            },
            error: (error) => console.error('Error loading recent users:', error)
        });

        // Get recent transactions
        this.transactionService.getAllTransactions().subscribe({
            next: (transactions) => {
                const recentTransactions = transactions
                    .sort((a, b) => new Date(b.dateTransaction).getTime() - new Date(a.dateTransaction).getTime())
                    .slice(0, 2);
                
                recentTransactions.forEach((transaction) => {
                    this.recentActivity.push({
                        id: this.recentActivity.length + 1,
                        user: 'System',
                        action: `${transaction.type} Transaction: €${transaction.montant}`,
                        timestamp: new Date(transaction.dateTransaction),
                        status: transaction.statut === 'COMPLETED' ? 'success' : transaction.statut === 'PENDING' ? 'warning' : 'danger'
                    });
                });
                
                // Sort by timestamp
                this.recentActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                this.recentActivity = this.recentActivity.slice(0, 5); // Keep only 5 most recent
            },
            error: (error) => console.error('Error loading recent transactions:', error)
        });
    }

    initCharts() {
        // Traffic chart data
        this.trafficData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Page Views',
                    data: [4200, 5100, 4800, 6200, 7100, 6800, 8900],
                    fill: false,
                    borderColor: '#42A5F5',
                    backgroundColor: '#42A5F5',
                    tension: 0.4
                },
                {
                    label: 'Unique Visitors',
                    data: [2800, 3400, 3200, 4100, 4700, 4500, 5900],
                    fill: false,
                    borderColor: '#66BB6A',
                    backgroundColor: '#66BB6A',
                    tension: 0.4
                }
            ]
        };

        this.trafficOptions = {
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

        // User type chart data
        this.userTypeData = {
            labels: ['Registered Users', 'Guest Users', 'Admin Users'],
            datasets: [
                {
                    data: [12500, 3200, 147],
                    backgroundColor: ['#42A5F5', '#FFA726', '#AB47BC'],
                    borderWidth: 0
                }
            ]
        };

        this.userTypeOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };
    }
}
