export const en = {
  // Navigation
  Dashboard: "Dashboard",
  Users: "Users",
  Settings: "Settings",
  "Sign Out": "Sign Out",

  // Main Menu
  "Budget Management": "Budget Management",
  "Sales Management": "Sales Management",
  "Order Management": "Order Management",
  "Revenue Management": "Revenue Management",
  "Master Management": "Master Management",

  // Sales Management Submenu
  "Proposal List": "Proposal List",
  "List of Projects": "List of Projects",
  "Activity History": "Activity History",

  // Order Management Submenu
  "Order List and Summary": "Order List and Summary",
  "Shipping Registration": "Shipping Registration",
  "Exhibition Order Management": "Exhibition Order Management",

  // Master Management Submenu
  "Product Master": "Product Master",
  "Customer Master": "Customer Master",
  "Material Master": "Material Master",
  "Image Master": "Image Master",

  // Settings Submenu
  "Usage Settings": "Usage Settings",
  Management: "Management",
  "User Management": "User Management",
  "User Permission Settings": "User Permission Settings",
  "Sales Management Settings": "Sales Management Settings",
  "Report Output Settings": "Report Output Settings",
  "Approval Management": "Approval Management",
  "Contract Information": "Contract Information",

  // Dashboard Page
  "Welcome to Dashboard": "Welcome to Dashboard",
  "Total Revenue": "Total Revenue",
  "Active Users": "Active Users",
  Sales: "Sales",
  "Pending Orders": "Pending Orders",
  "Recent Activity": "Recent Activity",
  "Quick Actions": "Quick Actions",
  "View All": "View All",

  // Users Page
  "Add User": "Add User",
  "Search users...": "Search users...",
  Name: "Name",
  Email: "Email",
  Role: "Role",
  Status: "Status",
  Actions: "Actions",
  Active: "Active",
  Inactive: "Inactive",
  Admin: "Admin",
  User: "User",
  Edit: "Edit",
  Delete: "Delete",

  // Settings Page
  "Application Settings": "Application Settings",
  General: "General",
  Notifications: "Notifications",
  Security: "Security",
  Language: "Language",
  "Select Language": "Select Language",
  English: "English",
  Japanese: "Japanese",
  Theme: "Theme",
  Light: "Light",
  Dark: "Dark",
  System: "System",
  "Save Changes": "Save Changes",
  "Changes saved successfully": "Changes saved successfully",

  // Common
  "Loading...": "Loading...",
  Save: "Save",
  Cancel: "Cancel",
  Close: "Close",
  Confirm: "Confirm",
  Error: "Error",
  Success: "Success",
  Warning: "Warning",
  Info: "Info",

  // 404 Page
  "Page Not Found": "Page Not Found",
  "The page you are looking for does not exist.": "The page you are looking for does not exist.",
  "Go to Dashboard": "Go to Dashboard",

  // Auth
  Login: "Login",
  Logout: "Logout",
  Username: "Username",
  Password: "Password",
  Unauthorized: "Unauthorized",
  Forbidden: "Forbidden",
  "You do not have permission to access this page.": "You do not have permission to access this page.",
  "Please login to continue.": "Please login to continue.",
  "Access Denied": "Access Denied",
  "Authentication Required": "Authentication Required",
} as const;

export type TranslationKey = keyof typeof en;
