export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  // Check if it's a valid URL
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if it's an image URL
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowerUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('image') ||
         lowerUrl.includes('media');
}

export function getImageUrl(url: string, baseUrl?: string): string {
  if (!url) {
    return '';
  }
  
  // If it's already a full URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative URL and we have a base URL, combine them
  if (baseUrl && url.startsWith('/')) {
    return baseUrl + url;
  }
  
  // If it's a relative URL without leading slash, add it
  if (baseUrl && !url.startsWith('/')) {
    return baseUrl + '/' + url;
  }
  
  return url;
}

export function addCacheBuster(url: string): string {
  if (!url) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
} 