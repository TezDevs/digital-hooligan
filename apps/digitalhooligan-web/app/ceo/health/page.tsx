import HealthClient from './HealthClient';

export default function Page({
    searchParams,
}: {
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    const whyVal = searchParams?.why;
    const why = Array.isArray(whyVal) ? whyVal[0] : whyVal ?? null;

    return <HealthClient whyRaw={why} />;
}