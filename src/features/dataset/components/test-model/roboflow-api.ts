import { RoboflowInferenceResponse } from "@/interfaces/project.interface";
import api from "@/lib/axios";

export async function runRoboflowInference(
  imageData: string,
  modelId: string,
  apiKey: string,
  confidenceThreshold: number = 50,
  overlapThreshold: number = 50,
  _customEndpoint?: string
): Promise<RoboflowInferenceResponse> {
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

  const response = await api.post(
    "/project/model/run-prediction",
    {
      imageData: base64Data,
      roboflowModelId: modelId,
      apiKey,
      confidenceThreshold,
      overlapThreshold,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  const payload = response.data as any;
  const data = payload?.data ?? payload;
  return data as RoboflowInferenceResponse;
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
