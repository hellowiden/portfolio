import { redirect } from 'next/navigation';

type PageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default function LoginRedirect({ searchParams }: PageProps) {
  const marketingBase = process.env.NEXT_PUBLIC_MARKETING_URL ?? '';
  const marketingOrigin = marketingBase ? marketingBase.replace(/\/$/, '') : '';
  const loginPath = marketingOrigin ? `${marketingOrigin}/login` : '/login';
  const callbackUrl = searchParams?.callbackUrl;
  const target = callbackUrl
    ? `${loginPath}?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : loginPath;

  redirect(target);
}
