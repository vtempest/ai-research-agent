'use client';

import DemoAccountGate from '@/features/Auth/DemoAccount/DemoAccountGate';
import { useAuthServerConfigStore } from '@/features/AuthShell';

import { SignInEmailSentStep } from './SignInEmailSentStep';
import { SignInEmailStep } from './SignInEmailStep';
import { SignInPasswordStep } from './SignInPasswordStep';
import { useSignIn } from './useSignIn';

const SignInForm = () => {
  const {
    disableEmailPassword,
    email,
    form,
    handleBackFromSent,
    handleBackToEmail,
    handleCheckUser,
    handleForgotPassword,
    handleGoToSignup,
    handleResendEmail,
    handleSignIn,
    handleSocialSignIn,
    isSocialOnly,
    lastAuthProvider,
    loading,
    oAuthSSOProviders,
    sending,
    sessionExpired,
    sentInfo,
    serverConfigInit,
    socialLoading,
    step,
  } = useSignIn();
  const enableDemoAccount = useAuthServerConfigStore(
    (s) => s.serverConfig.enableDemoAccount || false,
  );

  if (step === 'emailSent' && sentInfo)
    return (
      <SignInEmailSentStep
        email={sentInfo.email}
        sending={sending}
        type={sentInfo.type}
        onBack={handleBackFromSent}
        onResend={handleResendEmail}
      />
    );

  if (step === 'password')
    return (
      <SignInPasswordStep
        email={email}
        forgotLoading={sending}
        form={form as any}
        loading={loading}
        onBackToEmail={handleBackToEmail}
        onForgotPassword={handleForgotPassword}
        onSubmit={handleSignIn}
      />
    );

  return (
    <SignInEmailStep
      disableEmailPassword={disableEmailPassword}
      form={form as any}
      isSocialOnly={isSocialOnly}
      lastAuthProvider={lastAuthProvider}
      loading={loading}
      oAuthSSOProviders={oAuthSSOProviders}
      serverConfigInit={serverConfigInit}
      sessionExpired={sessionExpired}
      showDemoAccount={enableDemoAccount}
      socialLoading={socialLoading}
      onCheckUser={handleCheckUser}
      onGoToSignup={handleGoToSignup}
      onResetEmail={handleBackToEmail}
      onSetPassword={handleForgotPassword}
      onSocialSignIn={handleSocialSignIn}
    />
  );
};

/** While the demo account is on there is no sign-in screen: the visitor goes straight into the app. */
const SignIn = () => {
  const enableDemoAccount = useAuthServerConfigStore(
    (s) => s.serverConfig.enableDemoAccount || false,
  );

  if (enableDemoAccount) return <DemoAccountGate fallback={<SignInForm />} />;

  return <SignInForm />;
};

export default SignIn;
