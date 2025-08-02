import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { ProjetService } from '../services/projet.service';
import { TransactionService } from '../services/transaction.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Projet, Transaction, Utilisateur } from '../models/business.models';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User | null = null;
  userDetails: Utilisateur | null = null;
  projects: Projet[] = [];
  transactions: Transaction[] = [];
  loading = true;
  error: string | null = null;

  // Debug variables
  completedRequests = 0;
  totalRequests = 3;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private projetService: ProjetService,
    private transactionService: TransactionService,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  forceStopLoading(): void {
    this.loading = false;
    console.log('Loading manually stopped by user');
  }

  private loadUserProfile(): void {
    this.loading = true;
    this.error = null;
    this.completedRequests = 0;

    // Get current user from auth service
    this.user = this.authService.getCurrentUser();
    
    console.log('Current user:', this.user);

    if (!this.user) {
      this.error = 'Utilisateur non connecté';
      this.loading = false;
      return;
    }

    // Load user details, projects, and transactions
    this.loadUserDetails();
    this.loadUserProjects();
    this.loadUserTransactions();

    // Fallback timeout to stop loading after 10 seconds
    setTimeout(() => {
      if (this.loading) {
        console.log('Loading timeout reached');
        this.loading = false;
      }
    }, 10000);
  }

  private checkLoadingComplete(): void {
    this.completedRequests++;
    console.log(`Completed requests: ${this.completedRequests}/${this.totalRequests}`);
    
    if (this.completedRequests >= this.totalRequests) {
      this.loading = false;
      console.log('All requests completed, loading finished');
    }
  }

  private loadUserDetails(): void {
    if (!this.user?.id) {
      console.log('No user ID available for details');
      this.checkLoadingComplete();
      return;
    }

    const userIdNumber = parseInt(this.user.id);
    if (isNaN(userIdNumber)) {
      console.log('Invalid user ID format:', this.user.id);
      this.checkLoadingComplete();
      return;
    }

    console.log('Loading user details for ID:', userIdNumber);

    const sub = this.utilisateurService.getUtilisateurById(userIdNumber).subscribe({
      next: (userDetails) => {
        console.log('User details loaded:', userDetails);
        this.userDetails = userDetails;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.checkLoadingComplete();
      }
    });

    this.subscriptions.push(sub);
  }

  private loadUserProjects(): void {
    if (!this.user?.id) {
      console.log('No user ID available for projects');
      this.checkLoadingComplete();
      return;
    }

    const userIdNumber = parseInt(this.user.id);
    if (isNaN(userIdNumber)) {
      console.log('Invalid user ID format for projects:', this.user.id);
      this.checkLoadingComplete();
      return;
    }

    console.log('Loading projects for user ID:', userIdNumber);

    // Try to get projects by client ID
    const clientSub = this.projetService.getProjetsByClientId(userIdNumber).subscribe({
      next: (projects) => {
        console.log('Client projects loaded:', projects);
        this.projects = [...this.projects, ...projects];
        
        // Also try to get projects by responsible ID
        this.loadProjectsByResponsable(userIdNumber);
      },
      error: (error) => {
        console.error('Error loading client projects:', error);
        // Still try to get projects by responsible ID
        this.loadProjectsByResponsable(userIdNumber);
      }
    });

    this.subscriptions.push(clientSub);
  }

  private loadProjectsByResponsable(userId: number): void {
    console.log('Loading responsible projects for user ID:', userId);
    
    const responsableSub = this.projetService.getProjetsByResponsableId(userId).subscribe({
      next: (projects) => {
        console.log('Responsible projects loaded:', projects);
        // Avoid duplicates
        const existingIds = this.projects.map(p => p.id);
        const newProjects = projects.filter(p => !existingIds.includes(p.id));
        this.projects = [...this.projects, ...newProjects];
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading responsible projects:', error);
        this.checkLoadingComplete();
      }
    });

    this.subscriptions.push(responsableSub);
  }

  private loadUserTransactions(): void {
    if (!this.user?.id) {
      console.log('No user ID available for transactions');
      this.checkLoadingComplete();
      return;
    }

    const userIdNumber = parseInt(this.user.id);
    if (isNaN(userIdNumber)) {
      console.log('Invalid user ID format for transactions:', this.user.id);
      this.checkLoadingComplete();
      return;
    }

    console.log('Loading transactions for user ID:', userIdNumber);

    const sub = this.transactionService.getTransactionsByUserId(userIdNumber).subscribe({
      next: (transactions) => {
        console.log('Transactions loaded:', transactions);
        this.transactions = transactions.sort((a, b) => 
          new Date(b.dateTransaction).getTime() - new Date(a.dateTransaction).getTime()
        );
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.checkLoadingComplete();
      }
    });

    this.subscriptions.push(sub);
  }

  getProjectStatusText(status: string): string {
    switch (status) {
      case 'PLANIFIE': return 'Planifié';
      case 'EN_COURS': return 'En cours';
      case 'TERMINE': return 'Terminé';
      case 'SUSPENDU': return 'Suspendu';
      default: return status;
    }
  }

  getTransactionStatusText(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'COMPLETED': return 'Complétée';
      case 'CANCELLED': return 'Annulée';
      default: return status;
    }
  }

  getTransactionTypeText(type: string): string {
    switch (type) {
      case 'DEBIT': return 'Débit';
      case 'CREDIT': return 'Crédit';
      default: return type;
    }
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR');
  }

  getUserDisplayName(): string {
    if (this.userDetails?.nom) {
      return this.userDetails.nom;
    }
    return this.user?.fullName || 'Utilisateur';
  }

  getUserEmail(): string {
    if (this.userDetails?.email) {
      return this.userDetails.email;
    }
    return this.user?.email || '';
  }
}