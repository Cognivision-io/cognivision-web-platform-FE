import { RoboflowInferenceResponse } from "@/interfaces/project.interface";

export async function runRoboflowInference(
  imageData: string,
  modelId: string,
  apiKey: string,
  confidenceThreshold: number = 50,
  overlapThreshold: number = 50,
  customEndpoint?: string
): Promise<RoboflowInferenceResponse> {
  // Build API endpoint - use custom endpoint if provided, otherwise use detect.roboflow.com
  const endpoint = customEndpoint || `https://detect.roboflow.com/${modelId}`;
  
  // Convert thresholds to 0-1 range
  const confidence = confidenceThreshold / 100;
  const overlap = overlapThreshold / 100;
  
  // Build query parameters
  const params = new URLSearchParams({
    api_key: apiKey,
    confidence: confidence.toString(),
    overlap: overlap.toString(),
  });
  
  const url = `${endpoint}?${params.toString()}`;
  
  // If imageData is a blob URL, convert to base64
  let base64Data: string;
  if (imageData.startsWith("blob:")) {
    base64Data = await blobUrlToBase64(imageData);
  } else if (imageData.startsWith("data:image")) {
    // Already base64  
    base64Data = imageData.split(",")[1];
  } else {
    // Assume it's a URL
    base64Data = await imageUrlToBase64(imageData);
  }
  
  // Make API request
  // Roboflow expects the base64 string to be sent as form-urlencoded data
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: base64Data,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Roboflow API error (${response.status}): ${errorText}`);
  }
  
  return await response.json();
}

/**
 * Convert blob URL to base64
 */
async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Convert image URL to base64
 */
async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
