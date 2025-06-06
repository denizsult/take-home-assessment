/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockUsers, mockOrders } from "./mock-data";

const MOCK_API_DELAY = 1000;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Minimum tip tanımları
type AnyObject = Record<string, any>;

class MockApiBase {
  data: any[];
  resourceName: string;

  constructor(initialData: any[], resourceName: string) {
    this.data = [...initialData];
    this.resourceName = resourceName;
  }

  async getAll(
    filters: AnyObject = {},
    sort: any = null,
    page = 1,
    pageSize = 10
  ) {
    await delay(MOCK_API_DELAY);
    let result = [...this.data];

    // Filtreleme
    if (Object.keys(filters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null || value === "")
            return true;

          if (["start_date", "end_date"].includes(key)) {
            const itemDate = new Date(item["createdAt"]);
            const startDate = filters.start_date
              ? new Date(filters.start_date)
              : null;
            const endDate = filters.end_date
              ? new Date(filters.end_date)
              : null;
            if (endDate) {
              endDate.setDate(endDate.getDate() + 1);
            }

            if (startDate && endDate) {
              return itemDate >= startDate && itemDate <= endDate;
            }
            if (startDate) {
              return itemDate >= startDate;
            }
            if (endDate) {
              return itemDate <= endDate;
            }
            return true;
          }

          const itemValue = item[key];

          if (key === "search") {
            return Object.values(item).some((val) =>
              String(val).toLowerCase().includes(value.toLowerCase())
            );
          }

          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }

          return String(itemValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        });
      });
    }

    // Sıralama
    if (sort?.field) {
      result.sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];

        // Tarih değerleri için
        if (
          aVal instanceof Date ||
          (typeof aVal === "string" && !isNaN(Date.parse(aVal)))
        ) {
          const aTime = new Date(aVal).getTime();
          const bTime = new Date(bVal).getTime();
          return sort.direction === "asc" ? aTime - bTime : bTime - aTime;
        }

        // Sayısal değerler için
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        // String değerler için
        return sort.direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    // Sayfalama
    const total = result.length;
    const start = (page - 1) * pageSize;
    const paginatedData = result.slice(start, start + pageSize);

    return { data: paginatedData, total };
  }

  async getById(id: string) {
    await delay(MOCK_API_DELAY);
    return this.data.find((item) => item.id === id) || null;
  }

  async create(item: AnyObject) {
    await delay(MOCK_API_DELAY);
    const newItem = {
      ...item,
      id: `${this.resourceName}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.unshift(newItem);
    return newItem;
  }

  async update(id: string, updates: AnyObject) {
    await delay(MOCK_API_DELAY);
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`${this.resourceName} not found`);

    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  async delete(id: string) {
    await delay(MOCK_API_DELAY);
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`${this.resourceName} not found`);
    this.data.splice(index, 1);
  }
}

class UserApi extends MockApiBase {
  constructor() {
    super(mockUsers, "user");
  }
}

class OrderApi extends MockApiBase {
  constructor() {
    super(mockOrders, "order");
  }
}

export const userApi = new UserApi();
export const orderApi = new OrderApi();
