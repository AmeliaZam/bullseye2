import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authOptions';
import { getUser } from '@/utils/api';
import Sidebar from '@/components/Sidebar';
import pageNamesMapping from '@/utils/pageNamesMapping';

export default async function ImpersonationSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // @ts-ignore. huh, there is no cleaner api to access pathname on server for now so doing this. Will change it later when a more cleaner option is available
  const pathname: string = children?.props?.childProp.segment;

  const pagename = pageNamesMapping[pathname];

  if (!session) redirect('/signin');
  try {
    const sidebarResponse = await getUser(session.user?.email as string);

    return (
      <Sidebar
        initialUser={session?.user?.email as string}
        initialUserData={sidebarResponse.data}
        pagename={pagename}
      >
        {children}
      </Sidebar>
    );
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
}
