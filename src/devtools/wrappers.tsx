import { useLocation as useLocationRealm, NavLink as NavLinkRemix } from '@remix-run/react';
import { useLocation as useLocationVite, NavLink as NavLinkReact, NavLinkProps } from 'react-router-dom';
import { FC } from 'react';
import { Page, PageContent } from '../cms/page.model';
/*
type Location = ReturnType<typeof useLocationRealm>;
*/
function checkRealmVersion(): Boolean {
    return typeof process !== 'undefined' && process.env.REALM_ENV === 'true';
}
/*
function useLocation(): Location {
    if (checkRealmVersion()) {
        return useLocationRealm();
    } else {
        return useLocationVite();
    }
}*/

const NavLink: FC<NavLinkProps> = (props) => {
    if (checkRealmVersion()) {
        return <NavLinkRemix {...props} />;
    } else {
        return <NavLinkReact {...props} />;
    }
};

interface NavItemModel {
    path?: string;
    loadPage?: () => Promise<Page<PageContent>>;
}

interface NavItemProps {
    item: NavItemModel;
    tabIndex?: number;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ item, tabIndex, className, onClick, children }) => {
    if (item.path) {
        return <NavLink className={className} to={item.path} tabIndex={tabIndex} onClick={onClick}>
            {children}
        </NavLink>
        
    }
    return (
        <button className={className} tabIndex={tabIndex} onClick={onClick}>
            {children}
        </button>
    )
};

export { /*useLocation,*/ NavLink, NavItem };
