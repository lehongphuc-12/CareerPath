export interface MajorInfo {
  id: number;
  majorCode: string;
  majorName: string;
  groupCode?: string;
  isPrimary?: boolean;
}

export interface CareerDetails {
  careerId: number;
  name: string;
  description: string;
  image?: string;
  min_salary?: number;
  max_salary?: number;
  demand_level?: number;
  relatedMajors?: MajorInfo[];

  // Optional fields for enrichment (displayed if available)
  majors?: string;
  responsibilities?: string;
  roadmap_steps?: string;
  skills?: string[];
}

export interface Career {
  careerId: number;
  name: string;
  description: string;
  image?: string;
  min_salary?: number;
  max_salary?: number;
  demand_level?: number;
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
