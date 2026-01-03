import { redirect } from 'next/navigation';

type PageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default function RegisterRedirect({ searchParams }: PageProps) {
  const marketingBase = process.env.NEXT_PUBLIC_MARKETING_URL ?? '';
  const marketingOrigin = marketingBase ? marketingBase.replace(/\/$/, '') : '';
  const registerPath = marketingOrigin
    ? `${marketingOrigin}/register`
    : '/register';
  const callbackUrl = searchParams?.callbackUrl;
  const target = callbackUrl
    ? `${registerPath}?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : registerPath;

  redirect(target);
}
