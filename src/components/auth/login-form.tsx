import CardWrapper from '@/components/auth/card-wrapper';

export default function LoginForm() {
  return (
    <CardWrapper
      backButtonHref="/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
}
