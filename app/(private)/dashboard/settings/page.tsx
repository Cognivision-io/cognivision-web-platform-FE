import { redirect } from "next/navigation";

const SettingsIndexPage = () => {
  redirect("/dashboard/settings/login-security");
};

export default SettingsIndexPage;
