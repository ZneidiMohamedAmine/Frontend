// Business models for the application

export interface Utilisateur {
  id?: number;
  nom?: string;
  email?: string;
  motdepasse?: string;
  telephone?: string;
  adresse?: string;
  role?: string;
  dateCreation?: Date;
  isActive?: boolean;
}

export interface Transaction {
  id?: number;
  montant: number;
  type: 'DEBIT' | 'CREDIT';
  description?: string;
  dateTransaction: Date;
  utilisateurId?: number;
  projetId?: number;
  statut: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  reference?: string;
}

export interface Projet {
  id?: number;
  nom: string;
  description?: string;
  dateDebut: Date;
  dateFin?: Date;
  budget: number;
  statut: 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'SUSPENDU';
  clientId?: number;
  responsableId?: number;
  progression?: number; // percentage 0-100
  priorite?: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'CRITIQUE';
  devisId?: number; // Link to associated quote/devis
}

export interface KPI {
  id?: number;
  nom: string;
  description?: string;
  valeur: number;
  unite?: string;
  objectif?: number;
  dateCalcul: Date;
  projetId?: number;
  type: 'PERFORMANCE' | 'QUALITE' | 'TEMPS' | 'BUDGET';
  tendance?: 'HAUSSE' | 'BAISSE' | 'STABLE';
}

export interface Devis {
  id?: number;
  numero: string;
  clientId: number;
  dateCreation: Date;
  dateValidite: Date;
  montantHT: number;
  montantTTC: number;
  tva: number;
  statut: 'BROUILLON' | 'ENVOYE' | 'ACCEPTE' | 'REFUSE' | 'EXPIRE';
  description?: string;
  conditions?: string;
  items?: DevisItem[];
  displayText?: string; // Helper property for dropdowns
}

export interface DevisItem {
  id?: number;
  devisId?: number;
  designation: string;
  quantite: number;
  prixUnitaire: number;
  montant: number;
  description?: string;
}

// Response interfaces for API calls
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  success: boolean;
}

// Filter and pagination interfaces
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  [key: string]: any;
}