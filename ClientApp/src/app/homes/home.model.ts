export class Home {
  _id?: string;
  uploaderId?: string;
  city?: string;
  city2?: string;
  address?: string;
  zip?: number;
  size?: number;
  price?: number;
  rooms?: number;
  level?: number;
  levelsInBuilding?: number;
  condition?: string;
  year?: number;
  type?: string;
  heating?: string;
  parking?: string;
  garden?: boolean;
  attic?: boolean;
  elevator?: boolean;
  pet?: boolean;
  smoke?: boolean;
  image: File[] = [];
  viewCount?: number;
  savedCount?: number;
}
