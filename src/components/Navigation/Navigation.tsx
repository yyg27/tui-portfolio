import { navigationItems } from '../../data/navigation.data';

export default function Navigation() {
    return (
        <nav>
            {navigationItems.map((item)=>{
                return (
                    <a key={item.href} href={item.href}>
                        {item.label}
                    </a>
                )
            })};
        </nav>
    )
}