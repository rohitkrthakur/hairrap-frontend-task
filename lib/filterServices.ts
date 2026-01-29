import { Service } from "@/types/service";

export interface FilterState {
  search: string;
  categories: string[];
  location: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
}

export function filterServices(services: Service[], filters: FilterState): Service[] {
  return services.filter(service => {
    // Search filter - with null checks
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        service.name.toLowerCase().includes(searchLower) ||
        (service.salonName && service.salonName.toLowerCase().includes(searchLower)) ||
        (service.category && service.category.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Tags filter (if any tags selected)
    if (filters.tags.length > 0) {
      const matchesTag = filters.tags.some(tag => {
        const tagLower = tag.toLowerCase();
        return (
          service.name.toLowerCase().includes(tagLower) ||
          (service.category && service.category.toLowerCase().includes(tagLower))
        );
      });
      if (!matchesTag) return false;
    }

    // Category filter (if any categories selected)
    if (filters.categories.length > 0) {
      if (!service.category || !filters.categories.includes(service.category)) {
        return false;
      }
    }

    // Location filter - with null check
    if (filters.location && service.salonLocation !== filters.location) {
      return false;
    }

    // Price filter
    if (service.price < filters.minPrice || service.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

export function sortServices(services: Service[], sortBy: string): Service[] {
  const sorted = [...services];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      // Handle undefined salonRating by treating undefined as 0
      return sorted.sort((a, b) => {
        const ratingA = a.salonRating || 0;
        const ratingB = b.salonRating || 0;
        return ratingB - ratingA;
      });
    case 'name':
      // Handle undefined salonName by treating undefined as empty string
      return sorted.sort((a, b) => {
        const nameA = a.salonName || '';
        const nameB = b.salonName || '';
        return nameA.localeCompare(nameB);
      });
    default:
      return sorted;
  }
}