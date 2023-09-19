import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { SidebarDataType } from '@/components/Sidebar';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import AddNewProductPage from '@/pageComponents/AddNewProduct';
import NextAuth from '@/pages/api/auth/[...nextauth]';
import { Sidebar } from '@/components';
import { getUser } from '@/utils/api';
import { FormValues } from '@/pageComponents/AddNewProduct/AddNewProduct.types';

const PAGE_NAME = 'Create Product';

export type AddNewProductType = {
  createProductFormData: FormValues;
  sidebarData: SidebarDataType;
  session: Session;
  error?: string;
};

export default function AddNewUser({
  createProductFormData,
  sidebarData,
  session,
  error,
}: AddNewProductType) {
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
        <AddNewProductPage createProductFormData={createProductFormData} />
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
    const sidebarResponse = await getUser(session.user?.email as string);

    return {
      props: {
        createProductFormData: context.query,
        sidebarData: sidebarResponse.data,
        session,
      },
    };
  } catch {
    return {
      props: {
        createProductFormData: {},
        sidebarData: {},
        session,
        error: 'Failed to fetch data from API',
      },
    };
  }
}
