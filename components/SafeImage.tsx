import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { isValidImageUrl, getImageUrl } from '../utils/imageUtils';

interface SafeImageProps {
  source: { uri: string } | any;
  style: any;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  fallbackText?: string;
  useExpoImage?: boolean;
}

export function SafeImage({ 
  source, 
  style, 
  contentFit = 'cover', 
  resizeMode = 'cover',
  fallbackText = 'Image',
  useExpoImage = false 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Process the image URL
  const processedSource = { ...source };
  if (source.uri) {
    const originalUri = source.uri;
    const processedUri = getImageUrl(originalUri);
    
    if (!isValidImageUrl(processedUri)) {
      console.warn('Invalid image URL:', originalUri);
      setHasError(true);
    }
    
    processedSource.uri = processedUri;
  }

  const handleError = () => {
    console.error('Image failed to load:', processedSource.uri);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <View style={[style, { 
        backgroundColor: '#f0f0f0', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }]}>
        <Text style={{ color: '#999', fontSize: 12 }}>{fallbackText}</Text>
      </View>
    );
  }

  if (useExpoImage) {
    return (
      <ExpoImage
        source={processedSource}
        style={style}
        contentFit={contentFit}
        onError={handleError}
        onLoad={handleLoad}
      />
    );
  }

  return (
    <Image
      source={processedSource}
      style={style}
      resizeMode={resizeMode}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
} 