// User model matching the backend Utilisateur object
export interface Utilisateur {
  nom?: string;
  email?: string;
  motdepasse?: string;
  // Add other fields as needed based on your backend model
}

// Email request for password reset
export interface EmailRequest {
  email: string;
}

// Password DTO for saving new password
export interface PasswordDto {
  token: string;
  newPassword: string;
}

// Response interfaces
export interface AuthResponse {
  message?: string;
  error?: string;
  jwtToken?: string;
}

// Login request interface
export interface LoginRequest {
  nom: string;
  motdepasse: string;
}

// Signup request interface  
export interface SignupRequest {
  nom: string;
  email: string;
  motdepasse: string;
  // Add other required fields for signup
}

export enum Role {
  Admin = 'Admin',
  Client = 'Client',
  Visiteur = 'Visiteur',
  // ...other roles
}