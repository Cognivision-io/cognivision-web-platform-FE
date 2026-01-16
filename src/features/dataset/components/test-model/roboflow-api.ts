import { RoboflowInferenceResponse } from "@/interfaces/project.interface";
import api from "@/lib/axios";

export async function runRoboflowInference(
  imageData: string,
  modelId: string,
  apiKey: string,
  confidenceThreshold: number = 50,
  overlapThreshold: number = 50,
  _customEndpoint?: string,
  workspaceName?: string
): Promise<RoboflowInferenceResponse> {
  // Ensure imageData is sent as a data URL (data:image...)
  let imagePayload: string;
  if (imageData.startsWith("blob:")) {
    imagePayload = await blobUrlToBase64(imageData);
  } else if (imageData.startsWith("data:image")) {
    imagePayload = imageData;
  } else if (
    imageData.startsWith("http://") ||
    imageData.startsWith("https://")
  ) {
    // Assume it's a URL
    imagePayload = await imageUrlToBase64(imageData);
  } else {
    // Assume it's already raw base64
    imagePayload = `data:image/jpeg;base64,${imageData}`;
  }

  const response = await api.post(
    "/project/model/run-prediction",
    {
      imageData: imagePayload,
      roboflowModelId: normalizeRoboflowModelId(modelId, workspaceName),
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

function normalizeRoboflowModelId(modelId: string, workspaceName?: string) {
  const trimmedWorkspace = workspaceName?.trim().replace(/^\/+|\/+$/g, "");
  const trimmedModelId = modelId?.trim();
  if (!trimmedWorkspace || !trimmedModelId) return modelId;
  if (trimmedModelId.startsWith(`${trimmedWorkspace}/`)) {
    return trimmedModelId;
  }
  return `${trimmedWorkspace}/${trimmedModelId}`;
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
      resolve(reader.result as string);
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
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
