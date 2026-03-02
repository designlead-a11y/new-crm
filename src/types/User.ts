export interface User {
  id: number;
  name: string;
  userType?: string;
  userCode?: string;
  address?: string;
  phone?: string;
  chat?: string;
  email?: string;
  center: string;
  role: string;
  whatsapp?: string;
  additionalPhone?: string;
  gender?: string;
  aadhar?: string;
  pan?: string;
  manuallySetPassword?: boolean;
  password?: string;
  lastLogin?: string;
  lastLogout?: string;
  status: 'active' | 'inactive';
}
