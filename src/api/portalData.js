import portalClient from "./portalClient.js";

export async function getPortalDashboard() {
  const { data } = await portalClient.get("/portal/dashboard");
  return data;
}

export async function getPortalInvoices({ page = 1, limit = 20, status } = {}) {
  const params = { page, limit };
  if (status) params.status = status;
  const { data } = await portalClient.get("/portal/invoices", { params });
  return data;
}

export async function getPortalQuotations({ page = 1, limit = 20, status } = {}) {
  const params = { page, limit };
  if (status) params.status = status;
  const { data } = await portalClient.get("/portal/quotations", { params });
  return data;
}

export async function getPortalProjects({ page = 1, limit = 20, status } = {}) {
  const params = { page, limit };
  if (status) params.status = status;
  const { data } = await portalClient.get("/portal/projects", { params });
  return data;
}

export async function getPortalContracts({ page = 1, limit = 20, status } = {}) {
  const params = { page, limit };
  if (status) params.status = status;
  const { data } = await portalClient.get("/portal/contracts", { params });
  return data;
}
