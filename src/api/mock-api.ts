import { FilterState } from '@/types/filter.types';
import { mockUsers, mockOrders } from './mock-data';
import { ResourceId, SortState, User, Order } from './types';

// Simulated API delay
const MOCK_API_DELAY = 1000;

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Base API class for common operations
class MockApiBase<T extends { id: ResourceId }> {
  protected data: T[];
  protected resourceName: string;

  constructor(initialData: T[], resourceName: string) {
    this.data = [...initialData];
    this.resourceName = resourceName;
  }

  async getAll(
    filters: FilterState = {},
    sort?: SortState,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: T[]; total: number }> {
    // Simulate API delay
    await delay(MOCK_API_DELAY);

    let filteredData = [...this.data];

    // Apply filters
    if (filters) {
      filteredData = filteredData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;

          const itemValue = (item as any)[key];

          // Handle date range filters
          if (key.endsWith('_start') || key.endsWith('_end')) {
            const fieldName = key.split('_')[0];
            const itemDate = new Date(itemValue).getTime();
            const filterDate = new Date(value as string).getTime();

            return key.endsWith('_start')
              ? itemDate >= filterDate
              : itemDate <= filterDate;
          }

          // Handle search filter
          if (key === 'search') {
            return Object.values(item).some(val =>
              String(val).toLowerCase().includes((value as string).toLowerCase())
            );
          }

          // Handle array values
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }

          // Handle boolean values
          if (typeof value === 'boolean') {
            return itemValue === value;
          }

          // Handle string and number values
          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        });
      });
    }

    // Apply sorting
    if (sort && sort.field) {
      filteredData.sort((a, b) => {
        const aValue = (a as any)[sort.field];
        const bValue = (b as any)[sort.field];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sort.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sort.direction === 'asc' 
          ? (aValue > bValue ? 1 : -1)
          : (aValue < bValue ? 1 : -1);
      });
    }

    const total = filteredData.length;
    
    // Apply pagination
    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    return { data: paginatedData, total };
  }

  async getById(id: ResourceId): Promise<T | null> {
    await delay(MOCK_API_DELAY);
    const item = this.data.find(item => item.id === id);
    return item || null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    await delay(MOCK_API_DELAY);
    
    // Generate a new ID
    const id = `${this.resourceName}-${Date.now()}` as ResourceId;
    
    const newItem = { ...item, id } as T;
    this.data.unshift(newItem);
    
    return newItem;
  }

  async update(id: ResourceId, updates: Partial<T>): Promise<T> {
    await delay(MOCK_API_DELAY);
    
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`${this.resourceName} not found`);
    }
    
    const updatedItem = { ...this.data[index], ...updates };
    this.data[index] = updatedItem;
    
    return updatedItem;
  }

  async delete(id: ResourceId): Promise<void> {
    await delay(MOCK_API_DELAY);
    
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`${this.resourceName} not found`);
    }
    
    this.data.splice(index, 1);
  }
}

// User-specific API
export class UserApi extends MockApiBase<User> {
  constructor() {
    super(mockUsers, 'user');
  }
}

// Order-specific API
export class OrderApi extends MockApiBase<Order> {
  constructor() {
    super(mockOrders, 'order');
  }
}

// API instances
export const userApi = new UserApi();
export const orderApi = new OrderApi();