import api from "./api";

export default async function logAction(action_type, details = {}) {
  const cin = localStorage.getItem("caisierCin");

  if (!cin) return; // باش غير الكاشيير هو لي يسجل

  await api.post("/log_action.php", {
    caisier_cin: cin,
    action_type,
    details,
  });
}
