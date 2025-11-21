// Utility functions for handling images
export const getImageSrc = (imageUrl: string | undefined | null): string => {
  // Return fallback if no image URL provided
  if (!imageUrl) {
    return getDefaultVaccineImage();
  }

  // Handle relative URLs
  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  // Handle external URLs - check if they're valid
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Handle base64 data URLs
  if (imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  // Fallback for invalid URLs
  console.warn("Invalid image URL:", imageUrl);
  return getDefaultVaccineImage();
};

export const getDefaultVaccineImage = (): string => {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmOGZhZmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iIzM5OGVmNCIgb3BhY2l0eT0iMC4xIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzM5OGVmNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+💉</L0V4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjM2NzZkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WYWNjaW5lIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
};

export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return (response.ok && contentType?.startsWith("image/")) || false;
  } catch {
    return false;
  }
};

export const preloadImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

// Enhanced image props for Ant Design Image component
export const getImageProps = (
  imageUrl: string | undefined | null,
  alt: string = "Image"
) => {
  const src = getImageSrc(imageUrl);

  return {
    src,
    alt,
    fallback: getDefaultVaccineImage(),
    placeholder: "💉 Loading...",
    onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = event.target as HTMLImageElement;
      console.error("Image load failed:", {
        originalUrl: imageUrl,
        processedUrl: src,
        error: event.type,
        targetSrc: img?.src,
      });
    },
    onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = event.target as HTMLImageElement;
      console.log("Image loaded successfully:", {
        src,
        naturalWidth: img?.naturalWidth,
        naturalHeight: img?.naturalHeight,
      });
    },
  };
};
