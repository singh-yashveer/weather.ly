export interface City {
  id: string;
  name: string;
  countryCode: string;
  stateCode?: string;
  latitude: number;
  longitude: number;
  region?: string;
  country?: string;
}

export interface ApiResponse {
  data: City[];
  metadata?: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
  onSelectCity: (city: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  clearOnSelect?: boolean;
  isSearchPending?: boolean;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  error: string | null;
  showDropdown: boolean;
  selectedIndex: number;
}
