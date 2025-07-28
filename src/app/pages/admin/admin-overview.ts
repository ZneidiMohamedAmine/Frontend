import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusListComponent, StatusItem } from './components/status-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [CommonModule, StatusListComponent, CardModule, ButtonModule, TabViewModule, BadgeModule],
  template: `
    <div class="grid">
      <!-- Header -->
      <div class="col-12">
        <div class="card">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
            <i class="pi pi-th-large mr-3 text-primary"></i>Admin Overview
          </h1>
          <p class="text-muted-color text-lg">Manage all your platform components from one place</p>
        </div>
      </div>

      <!-- Tabbed Status Lists -->
      <div class="col-12">
        <p-tabView>
          <!-- Users Tab -->
          <p-tabPanel header="Users" leftIcon="pi pi-users">
            <ng-template pTemplate="header">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-users"></i>
                <span>Users</span>
                <p-badge [value]="userItems.length" severity="info"></p-badge>
              </span>
            </ng-template>
            
            <app-status-list
              title="User Management"
              titleIcon="pi pi-users"
              [items]="userItems"
              emptyMessage="No users found. Add your first user to get started."
              (itemView)="onViewUser($event)"
              (itemEdit)="onEditUser($event)"
              (itemDelete)="onDeleteUser($event)"
              (itemAdd)="onAddUser()">
            </app-status-list>
          </p-tabPanel>

          <!-- Projects Tab -->
          <p-tabPanel header="Projects" leftIcon="pi pi-briefcase">
            <ng-template pTemplate="header">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-briefcase"></i>
                <span>Projects</span>
                <p-badge [value]="projectItems.length" severity="warning"></p-badge>
              </span>
            </ng-template>
            
            <app-status-list
              title="Project Management"
              titleIcon="pi pi-briefcase"
              [items]="projectItems"
              emptyMessage="No projects found. Create your first project to begin."
              (itemView)="onViewProject($event)"
              (itemEdit)="onEditProject($event)"
              (itemDelete)="onDeleteProject($event)"
              (itemAdd)="onAddProject()">
            </app-status-list>
          </p-tabPanel>

          <!-- Transactions Tab -->
          <p-tabPanel header="Transactions" leftIcon="pi pi-credit-card">
            <ng-template pTemplate="header">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-credit-card"></i>
                <span>Transactions</span>
                <p-badge [value]="transactionItems.length" severity="success"></p-badge>
              </span>
            </ng-template>
            
            <app-status-list
              title="Transaction Management"
              titleIcon="pi pi-credit-card"
              [items]="transactionItems"
              emptyMessage="No transactions found. Transactions will appear here once created."
              (itemView)="onViewTransaction($event)"
              (itemEdit)="onEditTransaction($event)"
              (itemDelete)="onDeleteTransaction($event)"
              (itemAdd)="onAddTransaction()">
            </app-status-list>
          </p-tabPanel>

          <!-- KPIs Tab -->
          <p-tabPanel header="KPIs" leftIcon="pi pi-chart-line">
            <ng-template pTemplate="header">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-chart-line"></i>
                <span>KPIs</span>
                <p-badge [value]="kpiItems.length" severity="danger"></p-badge>
              </span>
            </ng-template>
            
            <app-status-list
              title="KPI Management"
              titleIcon="pi pi-chart-line"
              [items]="kpiItems"
              emptyMessage="No KPIs configured. Set up your first KPI to track performance."
              (itemView)="onViewKPI($event)"
              (itemEdit)="onEditKPI($event)"
              (itemDelete)="onDeleteKPI($event)"
              (itemAdd)="onAddKPI()">
            </app-status-list>
          </p-tabPanel>

          <!-- System Status Tab -->
          <p-tabPanel header="System" leftIcon="pi pi-cog">
            <ng-template pTemplate="header">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-cog"></i>
                <span>System</span>
                <p-badge [value]="systemItems.length" severity="secondary"></p-badge>
              </span>
            </ng-template>
            
            <app-status-list
              title="System Status"
              titleIcon="pi pi-cog"
              [items]="systemItems"
              [showAddButton]="false"
              emptyMessage="System monitoring data will appear here."
              (itemView)="onViewSystem($event)"
              (itemEdit)="onEditSystem($event)">
            </app-status-list>
          </p-tabPanel>
        </p-tabView>
      </div>
    </div>
  `
})
export class AdminOverview implements OnInit {
  
  // Sample data - replace with real data from your services
  userItems: StatusItem[] = [
    {
      id: 1,
      label: 'John Doe',
      status: 'active',
      description: 'Administrator - Full access',
      lastUpdated: new Date(Date.now() - 300000),
      assignee: 'System',
      priority: 'high'
    },
    {
      id: 2,
      label: 'Jane Smith',
      status: 'active',
      description: 'Project Manager - Limited access',
      lastUpdated: new Date(Date.now() - 600000),
      assignee: 'HR',
      priority: 'medium'
    },
    {
      id: 3,
      label: 'Mike Johnson',
      status: 'inactive',
      description: 'Developer - Suspended account',
      lastUpdated: new Date(Date.now() - 86400000),
      assignee: 'Admin',
      priority: 'low'
    }
  ];

  projectItems: StatusItem[] = [
    {
      id: 1,
      label: 'E-commerce Platform',
      status: 'active',
      description: 'Main platform development',
      progress: 75,
      lastUpdated: new Date(Date.now() - 3600000),
      assignee: 'Development Team',
      priority: 'critical'
    },
    {
      id: 2,
      label: 'Mobile App',
      status: 'pending',
      description: 'iOS and Android application',
      progress: 45,
      lastUpdated: new Date(Date.now() - 7200000),
      assignee: 'Mobile Team',
      priority: 'high'
    },
    {
      id: 3,
      label: 'Analytics Dashboard',
      status: 'completed',
      description: 'Business intelligence dashboard',
      progress: 100,
      lastUpdated: new Date(Date.now() - 172800000),
      assignee: 'Data Team',
      priority: 'medium'
    }
  ];

  transactionItems: StatusItem[] = [
    {
      id: 1,
      label: 'Payment #TXN-001',
      status: 'completed',
      description: '€5,000 - Project milestone',
      lastUpdated: new Date(Date.now() - 1800000),
      assignee: 'Finance',
      priority: 'medium'
    },
    {
      id: 2,
      label: 'Payment #TXN-002',
      status: 'pending',
      description: '€2,500 - Monthly subscription',
      lastUpdated: new Date(Date.now() - 3600000),
      assignee: 'Billing',
      priority: 'high'
    },
    {
      id: 3,
      label: 'Refund #REF-001',
      status: 'cancelled',
      description: '€1,200 - Service cancellation',
      lastUpdated: new Date(Date.now() - 7200000),
      assignee: 'Support',
      priority: 'low'
    }
  ];

  kpiItems: StatusItem[] = [
    {
      id: 1,
      label: 'User Satisfaction',
      status: 'active',
      description: '94.2% - Above target',
      progress: 94,
      lastUpdated: new Date(Date.now() - 3600000),
      priority: 'high'
    },
    {
      id: 2,
      label: 'Revenue Growth',
      status: 'active',
      description: '18.7% - Meeting expectations',
      progress: 87,
      lastUpdated: new Date(Date.now() - 7200000),
      priority: 'critical'
    },
    {
      id: 3,
      label: 'Project Completion',
      status: 'pending',
      description: '75% - Needs attention',
      progress: 75,
      lastUpdated: new Date(Date.now() - 10800000),
      priority: 'medium'
    }
  ];

  systemItems: StatusItem[] = [
    {
      id: 1,
      label: 'Database Connection',
      status: 'active',
      description: 'All connections healthy',
      lastUpdated: new Date(Date.now() - 300000),
      priority: 'critical'
    },
    {
      id: 2,
      label: 'API Services',
      status: 'active',
      description: 'All endpoints responding',
      lastUpdated: new Date(Date.now() - 600000),
      priority: 'critical'
    },
    {
      id: 3,
      label: 'Background Jobs',
      status: 'pending',
      description: '3 jobs in queue',
      lastUpdated: new Date(Date.now() - 900000),
      priority: 'medium'
    },
    {
      id: 4,
      label: 'Security Scan',
      status: 'completed',
      description: 'Last scan: 2 hours ago',
      lastUpdated: new Date(Date.now() - 7200000),
      priority: 'high'
    }
  ];

  ngOnInit() {
    // Load real data from services here
    this.loadData();
  }

  loadData() {
    // TODO: Replace with actual service calls
    console.log('Loading admin overview data...');
  }

  // User actions
  onViewUser(user: StatusItem) {
    console.log('View user:', user);
    // Navigate to user details or open modal
  }

  onEditUser(user: StatusItem) {
    console.log('Edit user:', user);
    // Navigate to user edit form or open modal
  }

  onDeleteUser(user: StatusItem) {
    console.log('Delete user:', user);
    // Show confirmation dialog and delete
  }

  onAddUser() {
    console.log('Add new user');
    // Navigate to user creation form or open modal
  }

  // Project actions
  onViewProject(project: StatusItem) {
    console.log('View project:', project);
  }

  onEditProject(project: StatusItem) {
    console.log('Edit project:', project);
  }

  onDeleteProject(project: StatusItem) {
    console.log('Delete project:', project);
  }

  onAddProject() {
    console.log('Add new project');
  }

  // Transaction actions
  onViewTransaction(transaction: StatusItem) {
    console.log('View transaction:', transaction);
  }

  onEditTransaction(transaction: StatusItem) {
    console.log('Edit transaction:', transaction);
  }

  onDeleteTransaction(transaction: StatusItem) {
    console.log('Delete transaction:', transaction);
  }

  onAddTransaction() {
    console.log('Add new transaction');
  }

  // KPI actions
  onViewKPI(kpi: StatusItem) {
    console.log('View KPI:', kpi);
  }

  onEditKPI(kpi: StatusItem) {
    console.log('Edit KPI:', kpi);
  }

  onDeleteKPI(kpi: StatusItem) {
    console.log('Delete KPI:', kpi);
  }

  onAddKPI() {
    console.log('Add new KPI');
  }

  // System actions
  onViewSystem(system: StatusItem) {
    console.log('View system:', system);
  }

  onEditSystem(system: StatusItem) {
    console.log('Edit system:', system);
  }
}