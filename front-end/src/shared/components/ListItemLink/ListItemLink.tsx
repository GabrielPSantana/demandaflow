import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { ReactNode } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
    to: string;
    icon: ReactNode;
    label: string;
    onClick: (() => void) | undefined;
}

export const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const resolvePath = useResolvedPath(to);
    const match = useMatch({ path: resolvePath.pathname, end: true });

    const handleClick = () => {
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} component={Link} to={to} onClick={handleClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};


