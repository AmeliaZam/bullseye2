import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { SidebarDataType } from '@/components/Sidebar';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import SchedulerRoot from '@/pageComponents/Scheduler/SchedulerRoot';
import NextAuth from '@/pages/api/auth/[...nextauth]';
import { Sidebar } from '@/components';
import { getSchedulerData, getUser } from '@/utils/api';
import { SchedulerDataType } from '@/pageComponents/Scheduler/SchedulerRoot.types';

const PAGE_NAME = 'Scheduler';

type SchedulerPropsType = {
  schedulerData: SchedulerDataType;
  sidebarData: SidebarDataType;
  session: Session;
  error?: string;
};

export default function Scheduler({
  schedulerData,
  sidebarData,
  session,
  error,
}: SchedulerPropsType) {
  if (error) return error;

  return (
    <>
      <Head>
        <title>RJYoung</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn3.devexpress.com/jslib/22.2.5/css/dx.light.css"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/scheduler.css" />
      </Head>

      <Sidebar
        initialUserData={sidebarData}
        initialUser={session.user?.email as string}
        pagename={PAGE_NAME}
      >
        <SchedulerRoot schedulerData={schedulerData} />
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
    const [sidebarResponse, schedulerResponse] = await Promise.all([
      getUser(session.user?.email as string),
      getSchedulerData(),
    ]);

    return {
      props: {
        schedulerData: schedulerResponse.data,
        sidebarData: sidebarResponse.data,
        session,
      },
    };
  } catch {
    return {
      props: {
        schedulerData: {},
        sidebarData: {},
        session,
        error: 'Failed to fetch data from API',
      },
    };
  }
}
