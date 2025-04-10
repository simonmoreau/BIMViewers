import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'https://func-bim42-prod-fr-bimviewers.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  // GET request
  async get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Promise<T> {
    const url = this.buildUrl(endpoint);
    const result = await firstValueFrom(this.http.get<T>(url, { params, headers }));
    if (result == null) {
      throw new Error(`GET request to ${url} returned null or undefined.`);
    }
    return result;
  }

  // POST request
  async post<T>(endpoint: string, body: any, headers?: HttpHeaders): Promise<T> {
    const url = this.buildUrl(endpoint);
    const result = await firstValueFrom(this.http.post<T>(url, body, { headers }));
    if (result == null) {
      throw new Error(`POST request to ${url} returned null or undefined.`);
    }
    return result;
  }

  // PUT request
  async put<T>(endpoint: string, body: any, headers?: HttpHeaders): Promise<T> {
    const url = this.buildUrl(endpoint);
    const result = await firstValueFrom(this.http.put<T>(url, body, { headers }));
    if (result == null) {
      throw new Error(`PUT request to ${url} returned null or undefined.`);
    }
    return result;
  }

  // DELETE request
  async delete<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Promise<T> {
    const url = this.buildUrl(endpoint);
    const result = await firstValueFrom(this.http.delete<T>(url, { params, headers }));
    if (result == null) {
      throw new Error(`DELETE request to ${url} returned null or undefined.`);
    }
    return result;
  }

  // PATCH request
  async patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Promise<T> {
    const url = this.buildUrl(endpoint);
    const result = await firstValueFrom(this.http.patch<T>(url, body, { headers }));
    if (result == null) {
      throw new Error(`PATCH request to ${url} returned null or undefined.`);
    }
    return result;
  }
}