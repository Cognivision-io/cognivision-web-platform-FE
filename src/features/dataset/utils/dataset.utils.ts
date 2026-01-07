export const formatProjectDate = (timestamp?: number | string | null) => {
  if (!timestamp) {
    return {
      header: "Loading...",
      badge: "Loading..."
    };
  }

  const date = new Date(Number(timestamp) * 1000);
  const header = `Uploaded on ${date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })} at ${date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()}`;

  const badge = `Uploaded ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} (${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })})`;

  return { header, badge };
};




export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    // Try to fetch with no-cors mode first
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (corsError) {
      // If CORS fails, fall back to direct link download
      // This will open the image in a new tab for cross-origin images
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
};
