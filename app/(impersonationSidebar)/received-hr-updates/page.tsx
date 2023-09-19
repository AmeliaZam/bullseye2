import ReceivedHRUpdatesPage from '@/pageComponents/ReceivedHRUpdates';
import { getReceivedHRUpdatesData } from '@/utils/api';

export default async function Page() {
  try {
    const receivedHRUpdatesResponse = await getReceivedHRUpdatesData();

    return <ReceivedHRUpdatesPage data={receivedHRUpdatesResponse.data} />;
  } catch {
    return <p>Failed to fetch data from API</p>;
  }
}
