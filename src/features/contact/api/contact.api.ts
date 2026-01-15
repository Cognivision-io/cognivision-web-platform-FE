import api from "@/lib/axios";
import type {
  ContactUsPayload,
  ContactUsResponse,
} from "@/interfaces/contact.interface";

export const contactApi = {
  submitContactUs: async (payload: ContactUsPayload) => {
    const response = await api.post<ContactUsResponse>("/contact-us", payload);
    return response.data;
  },
};

