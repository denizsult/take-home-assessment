import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { UserFormValues, userSchema, roleOptions } from './schemas';

interface UserFormProps {
  onSubmit: (data: UserFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Partial<UserFormValues>;
}

export function UserForm({ onSubmit, isLoading, defaultValues }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'viewer',
      isActive: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Full name"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              id="role"
              options={roleOptions}
              error={errors.role?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <Checkbox
          id="isActive"
          label="Active account"
          {...register('isActive')}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Save User
        </Button>
      </div>
    </form>
  );
}