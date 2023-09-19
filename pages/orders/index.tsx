import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { SidebarDataType } from '@/components/Sidebar';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import OrdersPage from '@/pageComponents/Orders';
import NextAuth from '@/pages/api/auth/[...nextauth]';
import { Sidebar } from '@/components';
import { getOrdersData, getUser, getSalesTeamsData } from '@/utils/api';
import { ResponseType } from '@/pageComponents/Orders/OrdersTable.types';

const PAGE_NAME = 'Orders';

type OrdersPropsType = {
  ordersTableData: ResponseType;
  sidebarData: SidebarDataType;
  salesTeamsData: string[];
  session: Session;
  error?: string;
};

export default function Orders({
  ordersTableData,
  sidebarData,
  salesTeamsData,
  session,
  error,
}: OrdersPropsType) {
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
        <OrdersPage
          ordersTableData={ordersTableData}
          salesTeamsData={salesTeamsData}
        />
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
    const [sidebarResponse, ordersTableResponse, salesTeamsResponse] =
      await Promise.all([
        getUser(session.user?.email as string),
        getOrdersData(),
        getSalesTeamsData(),
      ]);

    return {
      props: {
        ordersTableData: ordersTableResponse.data,
        sidebarData: sidebarResponse.data,
        salesTeamsData: salesTeamsResponse.data,
        session,
      },
    };
  } catch {
    return {
      props: {
        ordersTableData: [],
        sidebarData: {},
        salesTeamsData: [],
        session,
        error: 'Failed to fetch data from API',
      },
    };
  }
}
