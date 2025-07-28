import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/auth.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-test-admin',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, MessageModule],
    template: `
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <h2>Admin Role Testing</h2>
                    <p>Current User: {{ getCurrentUser()?.fullName || 'Not logged in' }}</p>
                    <p>Current Role: {{ getCurrentUser()?.role || 'No role' }}</p>
                    <p>JWT Token: {{ getToken() ? 'Present' : 'Not found' }}</p>
                    
                    <div class="flex gap-3 mt-4 flex-wrap">
                        <p-button 
                            label="Set Admin Role" 
                            icon="pi pi-user-plus" 
                            (click)="setRole('Admin')"
                            [disabled]="!isLoggedIn()">
                        </p-button>
                        
                        <p-button 
                            label="Set Client Role" 
                            icon="pi pi-user" 
                            (click)="setRole('Client')"
                            [disabled]="!isLoggedIn()"
                            styleClass="p-button-secondary">
                        </p-button>
                        
                        <p-button 
                            label="Go to Admin Dashboard" 
                            icon="pi pi-chart-line" 
                            (click)="goToAdminDashboard()"
                            [disabled]="!isAdmin()"
                            styleClass="p-button-success">
                        </p-button>
                    </div>
                    
                    <div class="mt-4" *ngIf="!isLoggedIn()">
                        <p-message severity="warn" text="Please log in first to test admin functionality."></p-message>
                    </div>
                    
                    <div class="mt-4" *ngIf="isLoggedIn() && !isAdmin()">
                        <p-message severity="info" text="You need admin role to access the admin dashboard."></p-message>
                    </div>
                </div>
            </div>
            
            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <h2>JWT Token Testing</h2>
                    <p>Test if JWT tokens are automatically sent with HTTP requests</p>
                    
                    <div class="flex gap-3 mt-4 flex-wrap">
                        <p-button 
                            label="Test Authenticated Request" 
                            icon="pi pi-send" 
                            (click)="testAuthenticatedRequest()"
                            [disabled]="!isLoggedIn()"
                            [loading]="isTestingRequest">
                        </p-button>
                    </div>
                    
                    <div class="mt-4" *ngIf="testResult">
                        <p-message 
                            [severity]="testResult.success ? 'success' : 'error'" 
                            [text]="testResult.message">
                        </p-message>
                    </div>
                    
                    <div class="mt-4" *ngIf="!isLoggedIn()">
                        <p-message severity="warn" text="Please log in first to test authenticated requests."></p-message>
                    </div>
                    
                    <div class="mt-4">
                        <h4>How it works:</h4>
                        <ul class="list-disc ml-6 mt-2">
                            <li>After login, JWT token is stored in localStorage</li>
                            <li>HTTP Interceptor automatically adds "Authorization: Bearer [token]" header to all requests</li>
                            <li>Backend can verify the token and identify the user</li>
                            <li>No need to manually add headers to each request</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class TestAdmin {
    isTestingRequest = false;
    testResult: { success: boolean; message: string } | null = null;
    
    constructor(private authService: AuthService, private router: Router) {}
    
    getCurrentUser() {
        return this.authService.getCurrentUser();
    }
    
    getToken() {
        return this.authService.getToken();
    }
    
    isLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }
    
    isAdmin(): boolean {
        const user = this.authService.getCurrentUser();
        return user?.role === Role.Admin;
    }
    
    setRole(role: string) {
        if (role === 'Admin') {
            this.authService.setUserRole(Role.Admin);
        } else if (role === 'Client') {
            this.authService.setUserRole(Role.Client);
        }
    }
    
    goToAdminDashboard() {
        this.router.navigate(['/admin/dashboard']);
    }
    
    testAuthenticatedRequest() {
        this.isTestingRequest = true;
        this.testResult = null;
        
        // Test making an authenticated request - the JWT token will be automatically added by the interceptor
        this.authService.makeAuthenticatedRequest('/test-endpoint').subscribe({
            next: (response) => {
                this.isTestingRequest = false;
                this.testResult = {
                    success: true,
                    message: 'Request sent successfully with JWT token in Authorization header! Check browser network tab to see the Authorization header.'
                };
            },
            error: (error) => {
                this.isTestingRequest = false;
                this.testResult = {
                    success: false,
                    message: `Request failed: ${error.message || 'Unknown error'}. But JWT token was still sent in the Authorization header.`
                };
            }
        });
    }
}