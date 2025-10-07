export type PermissionLevel = "none" | "reading" | "writing" | "approval";

export type Permissions = Record<string, PermissionLevel>;

export interface AuthState {
  isAuthenticated: boolean;
  permissions: Permissions;
}
