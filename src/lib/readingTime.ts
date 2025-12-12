// Smart reading time calculator based on word count
// Average reading speed: 200-250 words per minute

export const calculateReadingTime = (content: string): number => {
  // Strip HTML tags and markdown formatting
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/>\s/g, '')
    .replace(/\n/g, ' ')
    .trim();

  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Use 220 words per minute as average reading speed
  const readingTimeMinutes = Math.ceil(wordCount / 220);
  
  // Minimum 1 minute, maximum based on actual content
  return Math.max(1, readingTimeMinutes);
};

export const getWordCount = (content: string): number => {
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n/g, ' ')
    .trim();

  return plainText.split(/\s+/).filter(word => word.length > 0).length;
};
