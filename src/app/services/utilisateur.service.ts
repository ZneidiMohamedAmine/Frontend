import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Utilisateur, ApiResponse, PaginationParams, FilterParams } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new utilisateur
   */
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, utilisateur).pipe(
      catchError(error => {
        console.error('Error creating utilisateur:', error);
        throw error;
      })
    );
  }

  /**
   * Get all utilisateurs
   */
  getAllUtilisateurs(params?: PaginationParams & FilterParams): Observable<Utilisateur[]> {
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

    return this.http.get<Utilisateur[]>(`${this.apiUrl}${queryParams}`).pipe(
      catchError(error => {
        console.error('Error fetching utilisateurs:', error);
        return of([]);
      })
    );
  }

  /**
   * Get utilisateur by ID
   */
  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching utilisateur:', error);
        throw error;
      })
    );
  }

  /**
   * Update utilisateur
   */
  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, utilisateur).pipe(
      catchError(error => {
        console.error('Error updating utilisateur:', error);
        throw error;
      })
    );
  }

  /**
   * Delete utilisateur
   */
  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting utilisateur:', error);
        throw error;
      })
    );
  }

  /**
   * Get utilisateurs by role
   */
  getUtilisateursByRole(role: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/role/${role}`).pipe(
      catchError(error => {
        console.error('Error fetching utilisateurs by role:', error);
        return of([]);
      })
    );
  }

  /**
   * Activate/Deactivate utilisateur
   */
  toggleUtilisateurStatus(id: number, isActive: boolean): Observable<Utilisateur> {
    return this.http.patch<Utilisateur>(`${this.apiUrl}/${id}/status`, { isActive }).pipe(
      catchError(error => {
        console.error('Error toggling utilisateur status:', error);
        throw error;
      })
    );
  }

  /**
   * Search utilisateurs
   */
  searchUtilisateurs(query: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      catchError(error => {
        console.error('Error searching utilisateurs:', error);
        return of([]);
      })
    );
  }
}