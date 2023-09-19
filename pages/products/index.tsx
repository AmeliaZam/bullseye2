import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { SidebarDataType } from '@/components/Sidebar';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import ProductsPage from '@/pageComponents/Products';
import NextAuth from '@/pages/api/auth/[...nextauth]';
import { Sidebar } from '@/components';
import { getProductsData, getUser } from '@/utils/api';
import { ResponseType } from '@/pageComponents/Products/ProductsTable.types';

const PAGE_NAME = 'Products';

type ProductsPropsType = {
  productsTableData: ResponseType;
  sidebarData: SidebarDataType;
  session: Session;
  error?: string;
};

export default function Products({
  productsTableData,
  sidebarData,
  session,
  error,
}: ProductsPropsType) {
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
        <ProductsPage data={productsTableData} />
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
    const [sidebarResponse, productsTableResponse] = await Promise.all([
      getUser(session.user?.email as string),
      getProductsData(),
    ]);

    return {
      props: {
        productsTableData: productsTableResponse.data,
        sidebarData: sidebarResponse.data,
        session,
      },
    };
  } catch {
    return {
      props: {
        productsTableData: {},
        sidebarData: {},
        session,
        error: 'Failed to fetch data from API',
      },
    };
  }
}
