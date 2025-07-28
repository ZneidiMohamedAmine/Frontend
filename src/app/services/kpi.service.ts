import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { KPI, ApiResponse, PaginationParams, FilterParams } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class KPIService {
  private apiUrl = `${environment.apiUrl}/kpis`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new KPI
   */
  createKPI(kpi: KPI): Observable<KPI> {
    return this.http.post<KPI>(this.apiUrl, kpi).pipe(
      catchError(error => {
        console.error('Error creating KPI:', error);
        throw error;
      })
    );
  }

  /**
   * Get all KPIs
   */
  getAllKPIs(params?: PaginationParams & FilterParams): Observable<KPI[]> {
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

    return this.http.get<KPI[]>(`${this.apiUrl}${queryParams}`).pipe(
      catchError(error => {
        console.error('Error fetching KPIs:', error);
        return of([]);
      })
    );
  }

  /**
   * Get KPI by ID
   */
  getKPIById(id: number): Observable<KPI> {
    return this.http.get<KPI>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching KPI:', error);
        throw error;
      })
    );
  }

  /**
   * Update KPI
   */
  updateKPI(id: number, kpi: KPI): Observable<KPI> {
    return this.http.put<KPI>(`${this.apiUrl}/${id}`, kpi).pipe(
      catchError(error => {
        console.error('Error updating KPI:', error);
        throw error;
      })
    );
  }

  /**
   * Delete KPI
   */
  deleteKPI(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting KPI:', error);
        throw error;
      })
    );
  }

  /**
   * Get KPIs by project ID
   */
  getKPIsByProjectId(projectId: number): Observable<KPI[]> {
    return this.http.get<KPI[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      catchError(error => {
        console.error('Error fetching project KPIs:', error);
        return of([]);
      })
    );
  }

  /**
   * Get KPIs by type
   */
  getKPIsByType(type: string): Observable<KPI[]> {
    return this.http.get<KPI[]>(`${this.apiUrl}/type/${type}`).pipe(
      catchError(error => {
        console.error('Error fetching KPIs by type:', error);
        return of([]);
      })
    );
  }

  /**
   * Get KPI dashboard data
   */
  getKPIDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`).pipe(
      catchError(error => {
        console.error('Error fetching KPI dashboard:', error);
        return of({});
      })
    );
  }

  /**
   * Calculate KPI for project
   */
  calculateKPIForProject(projectId: number, kpiType: string): Observable<KPI> {
    return this.http.post<KPI>(`${this.apiUrl}/calculate`, { projectId, kpiType }).pipe(
      catchError(error => {
        console.error('Error calculating KPI:', error);
        throw error;
      })
    );
  }

  /**
   * Get KPI trends
   */
  getKPITrends(kpiId: number, period: string = '30d'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${kpiId}/trends?period=${period}`).pipe(
      catchError(error => {
        console.error('Error fetching KPI trends:', error);
        return of([]);
      })
    );
  }

  /**
   * Get KPI comparison
   */
  getKPIComparison(kpiIds: number[]): Observable<any> {
    const ids = kpiIds.join(',');
    return this.http.get<any>(`${this.apiUrl}/compare?ids=${ids}`).pipe(
      catchError(error => {
        console.error('Error fetching KPI comparison:', error);
        return of({});
      })
    );
  }

  /**
   * Get critical KPIs (below target)
   */
  getCriticalKPIs(): Observable<KPI[]> {
    return this.http.get<KPI[]>(`${this.apiUrl}/critical`).pipe(
      catchError(error => {
        console.error('Error fetching critical KPIs:', error);
        return of([]);
      })
    );
  }

  /**
   * Export KPI data
   */
  exportKPIData(format: 'csv' | 'excel' = 'csv', filters?: any): Observable<Blob> {
    let params = `?format=${format}`;
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          params += `&${key}=${encodeURIComponent(filters[key])}`;
        }
      });
    }

    return this.http.get(`${this.apiUrl}/export${params}`, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error exporting KPI data:', error);
        throw error;
      })
    );
  }
}