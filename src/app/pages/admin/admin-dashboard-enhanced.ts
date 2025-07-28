import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

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
  avatar?: string;
}

interface TopPage {
  page: string;
  views: number;
  uniqueViews: number;
  bounceRate: number;
}

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  color: string;
  count?: number;
  enabled: boolean;
}

@Component({
    selector: 'app-admin-dashboard-enhanced',
    standalone: true,
    imports: [
        CommonModule, ChartModule, TableModule, CardModule, ButtonModule, 
        TagModule, RouterModule, ProgressBarModule, AvatarModule, BadgeModule
    ],
    template: `
        <div class="grid">
            <!-- Header Section -->
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
                                [loading]="loading"
                                pTooltip="Refresh Data">
                            </p-button>
                            <p-button 
                                icon="pi pi-download" 
                                styleClass="p-button-outlined p-button-info"
                                (click)="exportData()"
                                pTooltip="Export Data">
                            </p-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Performance Indicators -->
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div class="flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="block text-blue-100 font-medium mb-3">Total Users</span>
                            <div class="text-white font-bold text-2xl">{{ siteStats.totalUsers | number }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-white bg-opacity-20 border-round" 
                             style="width:3rem;height:3rem">
                            <i class="pi pi-users text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <i class="pi pi-arrow-up text-green-300 mr-2"></i>
                        <span class="text-green-300 font-medium">+{{ siteStats.userGrowth }}%</span>
                        <span class="text-blue-100 ml-2">since last month</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-6 lg:col-3">
                <div class="card bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <div class="flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="block text-orange-100 font-medium mb-3">Active Projects</span>
                            <div class="text-white font-bold text-2xl">{{ siteStats.activeProjects }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-white bg-opacity-20 border-round" 
                             style="width:3rem;height:3rem">
                            <i class="pi pi-briefcase text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <i class="pi pi-chart-line text-green-300 mr-2"></i>
                        <span class="text-green-300 font-medium">{{ siteStats.projectGrowth }}%</span>
                        <span class="text-orange-100 ml-2">completion rate</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-6 lg:col-3">
                <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div class="flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="block text-green-100 font-medium mb-3">Revenue</span>
                            <div class="text-white font-bold text-2xl">€{{ siteStats.revenue | number:'1.0-0' }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-white bg-opacity-20 border-round" 
                             style="width:3rem;height:3rem">
                            <i class="pi pi-euro text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <i class="pi pi-arrow-up text-green-300 mr-2"></i>
                        <span class="text-green-300 font-medium">+{{ siteStats.revenueGrowth }}%</span>
                        <span class="text-green-100 ml-2">since last month</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-6 lg:col-3">
                <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <div class="flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="block text-purple-100 font-medium mb-3">Satisfaction</span>
                            <div class="text-white font-bold text-2xl">{{ siteStats.satisfaction }}%</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-white bg-opacity-20 border-round" 
                             style="width:3rem;height:3rem">
                            <i class="pi pi-heart text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <i class="pi pi-arrow-up text-green-300 mr-2"></i>
                        <span class="text-green-300 font-medium">+{{ siteStats.satisfactionGrowth }}%</span>
                        <span class="text-purple-100 ml-2">client rating</span>
                    </div>
                </div>
            </div>

            <!-- Quick Actions Grid -->
            <div class="col-12">
                <div class="card">
                    <h5 class="mb-4">
                        <i class="pi pi-bolt mr-2 text-primary"></i>Quick Actions & Management
                    </h5>
                    <div class="grid">
                        <div class="col-12 md:col-6 lg:col-4" *ngFor="let action of quickActions">
                            <div class="card border-1 surface-border hover:shadow-3 transition-all transition-duration-300 cursor-pointer"
                                 [class]="action.enabled ? 'hover:border-primary' : 'opacity-60'"
                                 (click)="navigateToAction(action)">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center">
                                        <div class="flex align-items-center justify-content-center border-round mr-3"
                                             [style]="'width:3rem;height:3rem;background:' + action.color + '20'">
                                            <i [class]="action.icon + ' text-xl'" [style]="'color:' + action.color"></i>
                                        </div>
                                        <div>
                                            <div class="font-medium text-surface-900 dark:text-surface-0">{{ action.label }}</div>
                                            <div class="text-muted-color text-sm" *ngIf="action.count !== undefined">
                                                {{ action.count }} items
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex align-items-center">
                                        <p-badge 
                                            *ngIf="!action.enabled" 
                                            value="Soon" 
                                            severity="warning">
                                        </p-badge>
                                        <i class="pi pi-chevron-right text-muted-color ml-2" *ngIf="action.enabled"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="col-12 lg:col-8">
                <div class="card">
                    <div class="flex align-items-center justify-content-between mb-4">
                        <h5 class="m-0">
                            <i class="pi pi-chart-line mr-2 text-primary"></i>Website Traffic
                        </h5>
                        <div class="flex gap-2">
                            <p-button 
                                label="7D" 
                                styleClass="p-button-text p-button-sm"
                                [outlined]="selectedPeriod !== '7D'"
                                (click)="selectedPeriod = '7D'">
                            </p-button>
                            <p-button 
                                label="30D" 
                                styleClass="p-button-text p-button-sm"
                                [outlined]="selectedPeriod !== '30D'"
                                (click)="selectedPeriod = '30D'">
                            </p-button>
                            <p-button 
                                label="90D" 
                                styleClass="p-button-text p-button-sm"
                                [outlined]="selectedPeriod !== '90D'"
                                (click)="selectedPeriod = '90D'">
                            </p-button>
                        </div>
                    </div>
                    <p-chart type="line" [data]="trafficData" [options]="trafficOptions" height="350px"></p-chart>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="card">
                    <h5 class="mb-4">
                        <i class="pi pi-users mr-2 text-primary"></i>User Distribution
                    </h5>
                    <p-chart type="doughnut" [data]="userTypeData" [options]="userTypeOptions" height="350px"></p-chart>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="col-12 lg:col-6">
                <div class="card">
                    <h5 class="mb-4">
                        <i class="pi pi-clock mr-2 text-primary"></i>Recent Activity
                    </h5>
                    <div class="space-y-4">
                        <div class="flex align-items-center p-3 border-round surface-ground" 
                             *ngFor="let activity of recentActivity">
                            <p-avatar 
                                [label]="activity.user.charAt(0)" 
                                styleClass="mr-3"
                                [style]="'background-color: ' + getAvatarColor(activity.user)">
                            </p-avatar>
                            <div class="flex-1">
                                <div class="font-medium text-surface-900 dark:text-surface-0">{{ activity.user }}</div>
                                <div class="text-muted-color text-sm">{{ activity.action }}</div>
                                <div class="text-muted-color text-xs">{{ activity.timestamp | date:'short' }}</div>
                            </div>
                            <p-tag 
                                [value]="activity.status" 
                                [severity]="activity.status"
                                styleClass="ml-2">
                            </p-tag>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Status -->
            <div class="col-12 lg:col-6">
                <div class="card">
                    <h5 class="mb-4">
                        <i class="pi pi-server mr-2 text-primary"></i>System Status
                    </h5>
                    <div class="space-y-4">
                        <div class="flex align-items-center justify-content-between p-3 border-round surface-ground">
                            <div class="flex align-items-center">
                                <i class="pi pi-database text-green-500 text-xl mr-3"></i>
                                <div>
                                    <div class="font-medium">Database</div>
                                    <div class="text-muted-color text-sm">Connection healthy</div>
                                </div>
                            </div>
                            <p-tag value="Online" severity="success"></p-tag>
                        </div>
                        
                        <div class="flex align-items-center justify-content-between p-3 border-round surface-ground">
                            <div class="flex align-items-center">
                                <i class="pi pi-cloud text-blue-500 text-xl mr-3"></i>
                                <div>
                                    <div class="font-medium">API Services</div>
                                    <div class="text-muted-color text-sm">All endpoints responding</div>
                                </div>
                            </div>
                            <p-tag value="Healthy" severity="success"></p-tag>
                        </div>
                        
                        <div class="flex align-items-center justify-content-between p-3 border-round surface-ground">
                            <div class="flex align-items-center">
                                <i class="pi pi-shield text-orange-500 text-xl mr-3"></i>
                                <div>
                                    <div class="font-medium">Security</div>
                                    <div class="text-muted-color text-sm">Last scan: 2 hours ago</div>
                                </div>
                            </div>
                            <p-tag value="Protected" severity="warning"></p-tag>
                        </div>
                        
                        <div class="flex align-items-center justify-content-between p-3 border-round surface-ground">
                            <div class="flex align-items-center">
                                <i class="pi pi-cog text-purple-500 text-xl mr-3"></i>
                                <div>
                                    <div class="font-medium">Background Jobs</div>
                                    <div class="text-muted-color text-sm">3 jobs running</div>
                                </div>
                            </div>
                            <p-tag value="Active" severity="info"></p-tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AdminDashboardEnhanced implements OnInit {
    loading: boolean = false;
    selectedPeriod: string = '30D';

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

    quickActions: QuickAction[] = [
        { 
            label: 'Manage Users', 
            icon: 'pi pi-users', 
            route: '/admin/users', 
            color: '#3B82F6',
            count: 156,
            enabled: true 
        },
        { 
            label: 'Manage Projects', 
            icon: 'pi pi-briefcase', 
            route: '/admin/projects', 
            color: '#F59E0B',
            count: 24,
            enabled: true 
        },
        { 
            label: 'Transactions', 
            icon: 'pi pi-credit-card', 
            route: '/admin/transactions', 
            color: '#10B981',
            count: 89,
            enabled: true 
        },
        { 
            label: 'Quotes & Devis', 
            icon: 'pi pi-file-edit', 
            route: '/admin/devis', 
            color: '#8B5CF6',
            count: 12,
            enabled: true 
        },
        { 
            label: 'KPI Dashboard', 
            icon: 'pi pi-chart-line', 
            route: '/admin/kpis', 
            color: '#EF4444',
            count: 8,
            enabled: true 
        },
        { 
            label: 'System Reports', 
            icon: 'pi pi-chart-bar', 
            route: '/admin/reports', 
            color: '#6366F1',
            enabled: true 
        }
    ];

    recentActivity: RecentActivity[] = [
        { id: 1, user: 'John Doe', action: 'Created new project', timestamp: new Date(Date.now() - 300000), status: 'success' },
        { id: 2, user: 'Jane Smith', action: 'Updated user profile', timestamp: new Date(Date.now() - 600000), status: 'success' },
        { id: 3, user: 'Admin', action: 'System maintenance', timestamp: new Date(Date.now() - 900000), status: 'warning' },
        { id: 4, user: 'Mike Johnson', action: 'Failed login attempt', timestamp: new Date(Date.now() - 1200000), status: 'danger' },
        { id: 5, user: 'Sarah Wilson', action: 'Completed transaction', timestamp: new Date(Date.now() - 1500000), status: 'success' }
    ];

    trafficData: any;
    trafficOptions: any;
    userTypeData: any;
    userTypeOptions: any;

    ngOnInit() {
        this.initCharts();
    }

    refreshData() {
        this.loading = true;
        // Simulate API call
        setTimeout(() => {
            this.loading = false;
            console.log('Data refreshed');
        }, 2000);
    }

    exportData() {
        console.log('Exporting data...');
        // Implement export functionality
    }

    navigateToAction(action: QuickAction) {
        if (action.enabled) {
            // Navigate to the route
            console.log('Navigating to:', action.route);
        }
    }

    getAvatarColor(name: string): string {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6366F1'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    }

    initCharts() {
        // Traffic chart data
        this.trafficData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Page Views',
                    data: [4200, 5100, 4800, 6200, 7100, 6800, 8900],
                    fill: true,
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Unique Visitors',
                    data: [2800, 3400, 3200, 4100, 4700, 4500, 5900],
                    fill: true,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        };

        // User type chart data
        this.userTypeData = {
            labels: ['Active Users', 'Inactive Users', 'Admin Users'],
            datasets: [
                {
                    data: [12500, 3200, 147],
                    backgroundColor: ['#3B82F6', '#F59E0B', '#EF4444'],
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