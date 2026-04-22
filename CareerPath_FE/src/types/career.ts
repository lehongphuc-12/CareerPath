export interface CareerDetails {
  careerId: number;
  name: string;
  description: string;
  image?: string;
  avgSalary?: number;
  demandLevel?: number;
}

export interface Career {
  careerId: number;
  name: string;
  description: string;
  image?: string;
  avgSalary?: number;
  demandLevel?: number;
  // Mock data fallback or future specific field
  vietnameseName?: string; 
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}
