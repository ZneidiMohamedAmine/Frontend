import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Devis, DevisItem, ApiResponse, PaginationParams, FilterParams } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = `${environment.apiUrl}/devis`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new devis
   */
  createDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, devis).pipe(
      catchError(error => {
        console.error('Error creating devis:', error);
        throw error;
      })
    );
  }

  /**
   * Get all devis
   */
  getAllDevis(params?: PaginationParams & FilterParams): Observable<Devis[]> {
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

    return this.http.get<Devis[]>(`${this.apiUrl}${queryParams}`).pipe(
      catchError(error => {
        console.error('Error fetching devis:', error);
        return of([]);
      })
    );
  }

  /**
   * Get devis by ID
   */
  getDevisById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching devis:', error);
        throw error;
      })
    );
  }

  /**
   * Update devis
   */
  updateDevis(id: number, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.apiUrl}/${id}`, devis).pipe(
      catchError(error => {
        console.error('Error updating devis:', error);
        throw error;
      })
    );
  }

  /**
   * Delete devis
   */
  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting devis:', error);
        throw error;
      })
    );
  }

  /**
   * Get devis by client ID
   */
  getDevisByClientId(clientId: number): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/client/${clientId}`).pipe(
      catchError(error => {
        console.error('Error fetching client devis:', error);
        return of([]);
      })
    );
  }

  /**
   * Get devis by status
   */
  getDevisByStatus(status: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/status/${status}`).pipe(
      catchError(error => {
        console.error('Error fetching devis by status:', error);
        return of([]);
      })
    );
  }

  /**
   * Change devis status
   */
  changeDevisStatus(id: number, status: string): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(error => {
        console.error('Error changing devis status:', error);
        throw error;
      })
    );
  }

  /**
   * Accept devis
   */
  acceptDevis(id: number): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/accept`, {}).pipe(
      catchError(error => {
        console.error('Error accepting devis:', error);
        throw error;
      })
    );
  }

  /**
   * Refuse devis
   */
  refuseDevis(id: number, reason?: string): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/refuse`, { reason }).pipe(
      catchError(error => {
        console.error('Error refusing devis:', error);
        throw error;
      })
    );
  }

  /**
   * Send devis to client
   */
  sendDevis(id: number, email?: string): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/send`, { email }).pipe(
      catchError(error => {
        console.error('Error sending devis:', error);
        throw error;
      })
    );
  }

  /**
   * Duplicate devis
   */
  duplicateDevis(id: number): Observable<Devis> {
    return this.http.post<Devis>(`${this.apiUrl}/${id}/duplicate`, {}).pipe(
      catchError(error => {
        console.error('Error duplicating devis:', error);
        throw error;
      })
    );
  }

  /**
   * Generate devis PDF
   */
  generateDevisPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error generating devis PDF:', error);
        throw error;
      })
    );
  }

  /**
   * Get devis statistics
   */
  getDevisStats(dateFrom?: Date, dateTo?: Date): Observable<any> {
    let params = '';
    if (dateFrom && dateTo) {
      params = `?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`;
    }
    
    return this.http.get<any>(`${this.apiUrl}/stats${params}`).pipe(
      catchError(error => {
        console.error('Error fetching devis stats:', error);
        return of({});
      })
    );
  }

  /**
   * Get expiring devis
   */
  getExpiringDevis(days: number = 7): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/expiring?days=${days}`).pipe(
      catchError(error => {
        console.error('Error fetching expiring devis:', error);
        return of([]);
      })
    );
  }

  /**
   * Search devis
   */
  searchDevis(query: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      catchError(error => {
        console.error('Error searching devis:', error);
        return of([]);
      })
    );
  }

  /**
   * Convert devis to project
   */
  convertToProject(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/convert-to-project`, {}).pipe(
      catchError(error => {
        console.error('Error converting devis to project:', error);
        throw error;
      })
    );
  }

  /**
   * Add item to devis
   */
  addDevisItem(devisId: number, item: DevisItem): Observable<DevisItem> {
    return this.http.post<DevisItem>(`${this.apiUrl}/${devisId}/items`, item).pipe(
      catchError(error => {
        console.error('Error adding devis item:', error);
        throw error;
      })
    );
  }

  /**
   * Update devis item
   */
  updateDevisItem(devisId: number, itemId: number, item: DevisItem): Observable<DevisItem> {
    return this.http.put<DevisItem>(`${this.apiUrl}/${devisId}/items/${itemId}`, item).pipe(
      catchError(error => {
        console.error('Error updating devis item:', error);
        throw error;
      })
    );
  }

  /**
   * Delete devis item
   */
  deleteDevisItem(devisId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${devisId}/items/${itemId}`).pipe(
      catchError(error => {
        console.error('Error deleting devis item:', error);
        throw error;
      })
    );
  }
}