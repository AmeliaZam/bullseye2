import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { SidebarDataType } from '@/components/Sidebar';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import NextAuth from '@/pages/api/auth/[...nextauth]';
import { Sidebar } from '@/components';
import { getMonthlySchedulerData, getUser } from '@/utils/api';
import MonthlySchedulerPage from '@/pageComponents/MonthlyScheduler';
import { ResponseType } from '@/pageComponents/MonthlyScheduler/MonthlyScheduler.types';

const PAGE_NAME = 'Monthly Scheduler';

type MonthlySchedulerPropsType = {
  monthlySchedulerData: ResponseType;
  sidebarData: SidebarDataType;
  session: Session;
  error?: string;
};

export default function MonthlyScheduler({
  monthlySchedulerData,
  sidebarData,
  session,
  error,
}: MonthlySchedulerPropsType) {
  if (error) return error;

  return (
    <>
      <Head>
        <title>RJYoung</title>
      </Head>

      <Sidebar
        initialUserData={sidebarData}
        initialUser={session.user?.email as string}
        pagename={PAGE_NAME}
      >
        <MonthlySchedulerPage data={monthlySchedulerData} />
      </Sidebar>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    NextAuth
  );
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }

  try {
    const [sidebarResponse, monthlySchedulerResponse] = await Promise.all([
      getUser(session.user?.email as string),
      getMonthlySchedulerData(),
    ]);

    return {
      props: {
        monthlySchedulerData: monthlySchedulerResponse.data,
        sidebarData: sidebarResponse.data,
        session,
      },
    };
  } catch {
    return {
      props: {
        monthlySchedulerData: {},
        sidebarData: {},
        session,
        error: 'Failed to fetch data from API',
      },
    };
  }
}
