// network-status.service.ts
import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  private readonly _isOnline: WritableSignal<boolean> = signal(navigator.onLine);
  readonly isOnline = computed(() => this._isOnline());

  constructor(private http: HttpClient) {
    // Initial setup based on browser events
    window.addEventListener('online', () => this._isOnline.set(true));
    window.addEventListener('offline', () => this._isOnline.set(false));

    // Check actual connectivity every 5 seconds
    interval(2000)
      .pipe(
        switchMap(() => this.pingServer()),
        catchError(() => of(false))
      )
      .subscribe((realStatus) => this._isOnline.set(realStatus));

    // Optionally log or trigger side effects
    effect(() => {
      console.log('Internet Status Changed:', this._isOnline() ? 'Online' : 'Offline');
    });
  }

  private pingServer() {
    // Recommended: replace with your backend health check endpoint
    return this.http
      .get('https://jsonplaceholder.typicode.com/posts/1', { responseType: 'json' })
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
