import Head from 'next/head';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { SignInButton } from '@/components';

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) router.push('/');
  }, [session, router]);

  return (
    <>
      <Head>
        <title>RJYoung</title>
      </Head>
      <SignInButton />;
    </>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
