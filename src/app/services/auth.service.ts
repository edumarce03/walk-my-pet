import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);

  constructor() {}
  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Método para guardar el rol en Firestore
  async setUserRole(uid: string, role: 'owner' | 'walker') {
    const userDocRef = doc(this.firestore, 'users', uid); // Referencia al documento del usuario
    await setDoc(userDocRef, { role }, { merge: true }); // Guarda el rol
  }

  // Método para obtener el rol desde Firestore
  async getUserRole(uid: string): Promise<'owner' | 'walker' | null> {
    const userDocRef = doc(this.firestore, 'users', uid); // Referencia al documento del usuario
    const userDoc = await getDoc(userDocRef); // Obtiene el documento
    return userDoc.exists()
      ? (userDoc.data()['role'] as 'owner' | 'walker')
      : null; // Retorna el rol o null
  }
}
