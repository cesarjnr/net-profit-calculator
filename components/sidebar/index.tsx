import Link from 'next/link';

interface MenuItem {
    page: string;
    link: string;
}

export default function Sidebar() {
    const menuItems: MenuItem[] = [
        { page: 'Dashboard', link: '/' },
        { page: 'Earnings', link: '/earnings'},
        { page: 'Compensations', link: '/compensations' },
        { page: 'Calculator', link: '/calculator' }
    ];

    return (
        <nav className="flex flex-col bg-primary">
            <div className="grow text-2xl flex justify-center items-center text-secondary font-bold">IC</div>
            <ul className="grow-[5] list-none flex flex-col text-secondary text-sm">
                {menuItems.map((item) => (
                    <li key={item.link} className="px-8 py-2 cursor-pointer hover:bg-secondary-transparent">
                        <Link href={item.link}>
                            {item.page}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}