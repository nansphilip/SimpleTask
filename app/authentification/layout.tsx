import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentification',
}

export default function AuthLayout({ children, }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}