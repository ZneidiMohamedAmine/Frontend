import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

export interface StatusItem {
  id: string | number;
  label: string;
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'draft' | 'approved' | 'rejected';
  description?: string;
  lastUpdated?: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  progress?: number;
  metadata?: { [key: string]: any };
}

@Component({
  selector: 'app-status-list',
  standalone: true,
  imports: [CommonModule, TagModule, ButtonModule, DropdownModule, FormsModule],
  template: `
    <div class="card">
      <div class="flex align-items-center justify-content-between mb-4">
        <h5 class="m-0">
          <i [class]="titleIcon + ' mr-2 text-primary'" *ngIf="titleIcon"></i>
          {{ title }}
        </h5>
        <div class="flex gap-2" *ngIf="showFilters">
          <p-dropdown 
            [(ngModel)]="selectedStatus" 
            [options]="statusOptions" 
            optionLabel="label" 
            optionValue="value"
            placeholder="Filter by status"
            (onChange)="onStatusFilter()"
            [showClear]="true">
          </p-dropdown>
          <p-button 
            icon="pi pi-plus" 
            styleClass="p-button-success"
            (click)="onAdd()"
            *ngIf="showAddButton">
          </p-button>
        </div>
      </div>

      <div class="space-y-3" *ngIf="filteredItems.length > 0; else emptyState">
        <div class="flex align-items-center justify-content-between p-3 border-round surface-ground hover:surface-hover transition-colors transition-duration-150"
             *ngFor="let item of filteredItems; trackBy: trackByFn">
          
          <!-- Item Info -->
          <div class="flex align-items-center flex-1">
            <div class="flex align-items-center justify-content-center border-round mr-3"
                 [style]="'width:2.5rem;height:2.5rem;background:' + getStatusColor(item.status) + '20'">
              <i [class]="getStatusIcon(item.status) + ' text-lg'" 
                 [style]="'color:' + getStatusColor(item.status)"></i>
            </div>
            
            <div class="flex-1">
              <div class="font-medium text-surface-900 dark:text-surface-0">{{ item.label }}</div>
              <div class="text-muted-color text-sm" *ngIf="item.description">{{ item.description }}</div>
              <div class="flex align-items-center gap-2 mt-1" *ngIf="item.assignee || item.lastUpdated">
                <span class="text-xs text-muted-color" *ngIf="item.assignee">
                  <i class="pi pi-user mr-1"></i>{{ item.assignee }}
                </span>
                <span class="text-xs text-muted-color" *ngIf="item.lastUpdated">
                  <i class="pi pi-clock mr-1"></i>{{ item.lastUpdated | date:'short' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mx-3" *ngIf="item.progress !== undefined" style="width: 100px;">
            <div class="text-xs text-muted-color mb-1">{{ item.progress }}%</div>
            <div class="w-full bg-surface-200 border-round" style="height: 6px;">
              <div class="bg-primary border-round transition-all transition-duration-300" 
                   [style]="'width: ' + item.progress + '%; height: 6px;'"></div>
            </div>
          </div>

          <!-- Priority Badge -->
          <div class="mx-2" *ngIf="item.priority">
            <p-tag 
              [value]="item.priority.toUpperCase()" 
              [severity]="getPrioritySeverity(item.priority)"
              styleClass="text-xs">
            </p-tag>
          </div>

          <!-- Status Badge -->
          <div class="mx-2">
            <p-tag 
              [value]="item.status.toUpperCase()" 
              [severity]="getStatusSeverity(item.status)">
            </p-tag>
          </div>

          <!-- Actions -->
          <div class="flex gap-1" *ngIf="showActions">
            <p-button 
              icon="pi pi-eye" 
              styleClass="p-button-rounded p-button-text p-button-sm"
              (click)="onView(item)"
              pTooltip="View Details">
            </p-button>
            <p-button 
              icon="pi pi-pencil" 
              styleClass="p-button-rounded p-button-text p-button-sm"
              (click)="onEdit(item)"
              pTooltip="Edit">
            </p-button>
            <p-button 
              icon="pi pi-trash" 
              styleClass="p-button-rounded p-button-text p-button-sm p-button-danger"
              (click)="onDelete(item)"
              pTooltip="Delete">
            </p-button>
          </div>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="text-center py-6">
          <i class="pi pi-inbox text-6xl text-muted-color mb-3"></i>
          <div class="text-muted-color text-lg">{{ emptyMessage || 'No items found' }}</div>
          <p-button 
            label="Add First Item" 
            icon="pi pi-plus" 
            styleClass="p-button-outlined mt-3"
            (click)="onAdd()"
            *ngIf="showAddButton">
          </p-button>
        </div>
      </ng-template>
    </div>
  `
})
export class StatusListComponent {
  @Input() title: string = 'Status List';
  @Input() titleIcon: string = '';
  @Input() items: StatusItem[] = [];
  @Input() showFilters: boolean = true;
  @Input() showActions: boolean = true;
  @Input() showAddButton: boolean = true;
  @Input() emptyMessage: string = '';

  @Output() itemView = new EventEmitter<StatusItem>();
  @Output() itemEdit = new EventEmitter<StatusItem>();
  @Output() itemDelete = new EventEmitter<StatusItem>();
  @Output() itemAdd = new EventEmitter<void>();

  selectedStatus: string = '';
  filteredItems: StatusItem[] = [];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Draft', value: 'draft' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' }
  ];

  ngOnInit() {
    this.filteredItems = [...this.items];
  }

  ngOnChanges() {
    this.onStatusFilter();
  }

  onStatusFilter() {
    if (this.selectedStatus) {
      this.filteredItems = this.items.filter(item => item.status === this.selectedStatus);
    } else {
      this.filteredItems = [...this.items];
    }
  }

  trackByFn(index: number, item: StatusItem): any {
    return item.id;
  }

  getStatusColor(status: string): string {
    const colors = {
      'active': '#10B981',
      'inactive': '#6B7280',
      'pending': '#F59E0B',
      'completed': '#3B82F6',
      'cancelled': '#EF4444',
      'draft': '#8B5CF6',
      'approved': '#10B981',
      'rejected': '#EF4444'
    };
    return colors[status] || '#6B7280';
  }

  getStatusIcon(status: string): string {
    const icons = {
      'active': 'pi pi-check-circle',
      'inactive': 'pi pi-minus-circle',
      'pending': 'pi pi-clock',
      'completed': 'pi pi-verified',
      'cancelled': 'pi pi-times-circle',
      'draft': 'pi pi-file-edit',
      'approved': 'pi pi-thumbs-up',
      'rejected': 'pi pi-thumbs-down'
    };
    return icons[status] || 'pi pi-circle';
  }

  getStatusSeverity(status: string): string {
    const severities = {
      'active': 'success',
      'inactive': 'secondary',
      'pending': 'warning',
      'completed': 'info',
      'cancelled': 'danger',
      'draft': 'secondary',
      'approved': 'success',
      'rejected': 'danger'
    };
    return severities[status] || 'secondary';
  }

  getPrioritySeverity(priority: string): string {
    const severities = {
      'low': 'success',
      'medium': 'warning',
      'high': 'danger',
      'critical': 'danger'
    };
    return severities[priority] || 'secondary';
  }

  onView(item: StatusItem) {
    this.itemView.emit(item);
  }

  onEdit(item: StatusItem) {
    this.itemEdit.emit(item);
  }

  onDelete(item: StatusItem) {
    this.itemDelete.emit(item);
  }

  onAdd() {
    this.itemAdd.emit();
  }
}