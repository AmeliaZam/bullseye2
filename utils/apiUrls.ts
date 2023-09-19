export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ACCESS_TOKEN_URL = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/token`;
export const EQUIPMENTS_URL = `${BASE_URL}/equipmentRequest`;
export const USER_IMPERSONATION_URL = `${BASE_URL}/userImpersonation`;
export const SCHEDULER_URL = `${BASE_URL}/scheduler`;
export const USERS_URL = `${BASE_URL}/users`;
export const PRODUCTS_URL = `${BASE_URL}/products`;
export const MONTHLY_SCHEDULER_URL = `${BASE_URL}/monthlyScheduler`;
export const ORDERS_URL = `${BASE_URL}/orders`;
export const SALES_TEAMS_URL = `${BASE_URL}/sales-teams`;
export const SALES_REPS_URL = `${BASE_URL}/sales-reps`;
export const PRICELIST_URL = `${BASE_URL}/price-list`;
export const EMAIL_RECEIPIENTS_URL = `${BASE_URL}/emails-receipients`;
export const RECEIVED_HR_UPDATES_URL = `${BASE_URL}/hr-updates`;

export const getSendEmailUrl = (sendFrom: string) =>
  `https://graph.microsoft.com/v1.0/users/${sendFrom}/sendMail`;

export const getHRUpdateURL = (id: number) =>
  `${RECEIVED_HR_UPDATES_URL}/${id}`;
