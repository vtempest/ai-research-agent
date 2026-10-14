'use client';

import { Navigate } from 'react-router';

import DemoAccountGate from '@/features/Auth/DemoAccount/DemoAccountGate';
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

  const form = <BetterAuthSignUpForm showDemoAccount={enableDemoAccount} />;

  // While the demo account is on there is no account creation: the visitor goes straight into the app.
  if (enableDemoAccount) return <DemoAccountGate fallback={form} />;

  return form;
};

export default SignUp;
