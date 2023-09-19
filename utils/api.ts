import axios from 'axios';

import {
  EQUIPMENTS_URL,
  USER_IMPERSONATION_URL,
  SCHEDULER_URL,
  USERS_URL,
  PRODUCTS_URL,
  MONTHLY_SCHEDULER_URL,
  ORDERS_URL,
  SALES_TEAMS_URL,
  SALES_REPS_URL,
  PRICELIST_URL,
  ACCESS_TOKEN_URL,
  EMAIL_RECEIPIENTS_URL,
  RECEIVED_HR_UPDATES_URL,
  getSendEmailUrl,
  getHRUpdateURL,
} from './apiUrls';

export const getUser = (username: string) =>
  axios.get(`${USER_IMPERSONATION_URL}/${username}`);
export const getTableData = () => axios.get(EQUIPMENTS_URL);
export const getSchedulerData = () => axios.get(SCHEDULER_URL);
export const getUsersData = () => axios.get(USERS_URL);
export const getProductsData = () => axios.get(PRODUCTS_URL);
export const getMonthlySchedulerData = () => axios.get(MONTHLY_SCHEDULER_URL);
export const getOrdersData = () => axios.get(ORDERS_URL);
export const getSalesTeamsData = () => axios.get(SALES_TEAMS_URL);
export const getSalesRepsData = (salesRep: string) =>
  axios.get(`${SALES_REPS_URL}/${salesRep}`);
export const getPriceListData = () => axios.get(PRICELIST_URL);
export const getEmailRecipientsData = () => axios.get(EMAIL_RECEIPIENTS_URL);
export const getReceivedHRUpdatesData = () =>
  axios.get(RECEIVED_HR_UPDATES_URL);

export const getAccessToken = (grantType: string, resource: string) => {
  const data = new URLSearchParams();
  data.append('grant_type', grantType);
  data.append('resource', resource);
  data.append('client_secret', String(process.env.AZURE_AD_CLIENT_SECRET));
  data.append('client_id', String(process.env.AZURE_AD_CLIENT_ID));

  return axios.post(ACCESS_TOKEN_URL, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const sendHRUpdate = (
  accessToken: string,
  sendFrom: string,
  subject: string,
  emailBody: string,
  receipient: string
) => {
  const body = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: emailBody,
      },
      toRecipients: [
        {
          emailAddress: {
            address: receipient,
          },
        },
      ],
    },
  };

  return axios.post(getSendEmailUrl(sendFrom), body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateCompletedStatus = (id: number, status: boolean) =>
  axios.patch(getHRUpdateURL(id), { status });
