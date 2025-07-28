import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Projet, ApiResponse, PaginationParams, FilterParams } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = `${environment.apiUrl}/projets`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new projet
   */
  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet).pipe(
      catchError(error => {
        console.error('Error creating projet:', error);
        throw error;
      })
    );
  }

  /**
   * Get all projets
   */
  getAllProjets(params?: PaginationParams & FilterParams): Observable<Projet[]> {
    let queryParams = '';
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key].toString());
        }
      });
      queryParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
    }

    return this.http.get<Projet[]>(`${this.apiUrl}${queryParams}`).pipe(
      catchError(error => {
        console.error('Error fetching projets:', error);
        return of([]);
      })
    );
  }

  /**
   * Get projet by ID
   */
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching projet:', error);
        throw error;
      })
    );
  }

  /**
   * Update projet
   */
  updateProjet(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}`, projet).pipe(
      catchError(error => {
        console.error('Error updating projet:', error);
        throw error;
      })
    );
  }

  /**
   * Delete projet
   */
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting projet:', error);
        throw error;
      })
    );
  }

  /**
   * Get projets by client ID
   */
  getProjetsByClientId(clientId: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/client/${clientId}`).pipe(
      catchError(error => {
        console.error('Error fetching client projets:', error);
        return of([]);
      })
    );
  }

  /**
   * Get projets by status
   */
  getProjetsByStatus(status: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/status/${status}`).pipe(
      catchError(error => {
        console.error('Error fetching projets by status:', error);
        return of([]);
      })
    );
  }

  /**
   * Get projets by responsible user ID
   */
  getProjetsByResponsableId(responsableId: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/responsable/${responsableId}`).pipe(
      catchError(error => {
        console.error('Error fetching projets by responsable:', error);
        return of([]);
      })
    );
  }

  /**
   * Update projet progress
   */
  updateProjetProgress(id: number, progression: number): Observable<Projet> {
    return this.http.patch<Projet>(`${this.apiUrl}/${id}/progress`, { progression }).pipe(
      catchError(error => {
        console.error('Error updating projet progress:', error);
        throw error;
      })
    );
  }

  /**
   * Change projet status
   */
  changeProjetStatus(id: number, status: string): Observable<Projet> {
    return this.http.patch<Projet>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(error => {
        console.error('Error changing projet status:', error);
        throw error;
      })
    );
  }

  /**
   * Get projet statistics
   */
  getProjetStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`).pipe(
      catchError(error => {
        console.error('Error fetching projet stats:', error);
        return of({});
      })
    );
  }

  /**
   * Search projets
   */
  searchProjets(query: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      catchError(error => {
        console.error('Error searching projets:', error);
        return of([]);
      })
    );
  }

  /**
   * Get overdue projets
   */
  getOverdueProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/overdue`).pipe(
      catchError(error => {
        console.error('Error fetching overdue projets:', error);
        return of([]);
      })
    );
  }

  /**
   * Get upcoming deadlines
   */
  getUpcomingDeadlines(days: number = 7): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/upcoming-deadlines?days=${days}`).pipe(
      catchError(error => {
        console.error('Error fetching upcoming deadlines:', error);
        return of([]);
      })
    );
  }
}