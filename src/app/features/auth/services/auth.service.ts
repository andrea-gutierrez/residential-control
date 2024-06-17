import {computed, Injectable, signal} from '@angular/core';
import {Observable, of} from "rxjs";

import {AuthStatus, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  // Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setCurrentUser(user?: Partial<User>) {
    this._currentUser.set({
      email: 'email@gmail.com',
      name: 'Andrea',
      roles: user?.roles ?? ['manager'],
      isActive: true,
      id: 2321,
    });
    localStorage.setItem('token', 'example');
    localStorage.setItem('user', JSON.stringify(this._currentUser()));
    this._authStatus.set(AuthStatus.authenticated);
  }

  login(_email: string, _password: string, role: string): Observable<boolean> {
    this.setCurrentUser({
      roles: [role]
    });
    return of(true);
  }

  logout(): Observable<boolean> {
    this._currentUser.set(null);
    localStorage.removeItem('token');
    return of(true);
  }

  checkAuthStatus(): Observable<Boolean> {
    if (!this.isLocalStorageAvailable) return of(true);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ?? '';
    if (token) {
      this._authStatus.set(AuthStatus.authenticated);
      this.setCurrentUser(JSON.parse(user));
      return of(false);
    }

    this._authStatus.set(AuthStatus.notAuthenticated);
    return of(true);
  }
}
