export interface City {
  id: string;
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: number;
  longitude: number;
}

export interface ApiResponse {
  data: City[];
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
  onSelectCity: (city: string) => void;
}
