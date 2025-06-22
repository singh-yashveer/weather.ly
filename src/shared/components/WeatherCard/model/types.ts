export interface WeatherCardProps {
  temp?: number;
  humidity?: number;
  pressure?: number;
  weathermood?: string;
  description?: string;
  name?: string;
  speed?: number;
  country?: string;
  sunset?: number;
  sunrise?: number;
  feels_like?: number;
  visibility?: number;
  clouds?: number;
  isLoading?: boolean;
  error?: string | null;
}

export interface WeatherIconMap {
  [key: string]: string;
}
