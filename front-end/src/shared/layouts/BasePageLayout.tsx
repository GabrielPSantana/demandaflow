import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../contexts';

interface IBasePageLayoutProps {
    children: ReactNode;
    title: string;
    barraDeFerramentas?: ReactNode;
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({
    children,
    title,
    barraDeFerramentas,
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)} gap={1}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h5">{title}</Typography>
            </Box>
            {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
            <Box>{children}</Box>
        </Box>
    );
};
