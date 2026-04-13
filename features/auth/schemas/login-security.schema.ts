import * as yup from "yup";
import type { InferType } from "yup";

import { emailRegex } from "@/lib/utils";

const loginSecurityBaseSchema = yup.object({
  name: yup.string().trim().required("Display name is required"),
  email: yup
    .string()
    .trim()
    .matches(emailRegex, "Enter a valid email")
    .required("Email is required"),
  currentPassword: yup.string().default(""),
  newPassword: yup.string().default(""),
  confirmPassword: yup.string().default(""),
});

export const loginSecurityFormSchema = loginSecurityBaseSchema.test(
  "password-change",
  function (value) {
    if (!value) return true;
    const cur = value.currentPassword ?? "";
    const neu = value.newPassword ?? "";
    const conf = value.confirmPassword ?? "";
    const touched =
      cur.length > 0 || neu.length > 0 || conf.length > 0;
    if (!touched) return true;

    if (!cur) {
      return this.createError({
        path: "currentPassword",
        message: "Enter your current password to set a new one.",
      });
    }
    if (neu.length > 0 && neu.length < 8) {
      return this.createError({
        path: "newPassword",
        message: "New password must be at least 8 characters.",
      });
    }
    if (touched && neu.length === 0) {
      return this.createError({
        path: "newPassword",
        message: "Enter a new password.",
      });
    }
    if (neu !== conf) {
      return this.createError({
        path: "confirmPassword",
        message: "New password and confirmation do not match.",
      });
    }
    return true;
  },
);

export type LoginSecurityFormValues = InferType<typeof loginSecurityFormSchema>;
