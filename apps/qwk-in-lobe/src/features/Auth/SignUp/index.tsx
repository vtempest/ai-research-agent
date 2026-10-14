'use client';

import { Navigate } from 'react-router';

import { useAuthServerConfigStore } from '@/features/AuthShell';

import BetterAuthSignUpForm from './BetterAuthSignUpForm';

const SignUp = () => {
  const disableEmailPassword = useAuthServerConfigStore(
    (s) => s.serverConfig.disableEmailPassword || false,
  );

  const enableDemoAccount = useAuthServerConfigStore(
    (s) => s.serverConfig.enableDemoAccount || false,
  );

  if (disableEmailPassword) return <Navigate replace to="/signin" />;

  return <BetterAuthSignUpForm showDemoAccount={enableDemoAccount} />;
};

export default SignUp;
