import { z } from 'zod';
import { UserRole } from '@/api/types';

// Schema for user form validation
export const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' }),
  role: z
    .enum(['admin', 'editor', 'viewer'] as const, { 
      invalid_type_error: 'Role must be admin, editor, or viewer' 
    }),
  isActive: z
    .boolean()
    .default(true),
});

export type UserFormValues = z.infer<typeof userSchema>;

// Map of role values to display labels
export const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

// Get role display label
export function getRoleLabel(role: UserRole): string {
  const option = roleOptions.find(o => o.value === role);
  return option ? option.label : role;
}