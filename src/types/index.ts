export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  grade?: string;
  avatar?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';