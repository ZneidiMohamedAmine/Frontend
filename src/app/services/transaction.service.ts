import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction, ApiResponse, PaginationParams, FilterParams } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new transaction
   */
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      catchError(error => {
        console.error('Error creating transaction:', error);
        throw error;
      })
    );
  }

  /**
   * Get all transactions
   */
  getAllTransactions(params?: PaginationParams & FilterParams): Observable<Transaction[]> {
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

    return this.http.get<Transaction[]>(`${this.apiUrl}${queryParams}`).pipe(
      catchError(error => {
        console.error('Error fetching transactions:', error);
        return of([]);
      })
    );
  }

  /**
   * Get transaction by ID
   */
  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching transaction:', error);
        throw error;
      })
    );
  }

  /**
   * Update transaction
   */
  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction).pipe(
      catchError(error => {
        console.error('Error updating transaction:', error);
        throw error;
      })
    );
  }

  /**
   * Delete transaction
   */
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting transaction:', error);
        throw error;
      })
    );
  }

  /**
   * Get transactions by user ID
   */
  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching user transactions:', error);
        return of([]);
      })
    );
  }

  /**
   * Get transactions by project ID
   */
  getTransactionsByProjectId(projectId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      catchError(error => {
        console.error('Error fetching project transactions:', error);
        return of([]);
      })
    );
  }

  /**
   * Get transactions by status
   */
  getTransactionsByStatus(status: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/status/${status}`).pipe(
      catchError(error => {
        console.error('Error fetching transactions by status:', error);
        return of([]);
      })
    );
  }

  /**
   * Get transaction statistics
   */
  getTransactionStats(dateFrom?: Date, dateTo?: Date): Observable<any> {
    let params = '';
    if (dateFrom && dateTo) {
      params = `?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`;
    }
    
    return this.http.get<any>(`${this.apiUrl}/stats${params}`).pipe(
      catchError(error => {
        console.error('Error fetching transaction stats:', error);
        return of({});
      })
    );
  }

  /**
   * Process transaction (change status to completed)
   */
  processTransaction(id: number): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}/process`, {}).pipe(
      catchError(error => {
        console.error('Error processing transaction:', error);
        throw error;
      })
    );
  }

  /**
   * Cancel transaction
   */
  cancelTransaction(id: number, reason?: string): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}/cancel`, { reason }).pipe(
      catchError(error => {
        console.error('Error cancelling transaction:', error);
        throw error;
      })
    );
  }
}