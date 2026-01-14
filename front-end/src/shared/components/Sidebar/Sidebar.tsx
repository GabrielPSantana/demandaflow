import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import { useDrawerContext } from '../../contexts';
import { ListItemLink } from '../ListItemLink/ListItemLink';
import PeopleIcon from '@mui/icons-material/People';

interface IAppThemeProviderProps {
    children: React.ReactNode;
}


export const Sidebar: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
            <Drawer
                open={isDrawerOpen}
                variant={smDown ? 'temporary' : 'permanent'}
                onClose={toggleDrawerOpen}
            >
                <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
                    <Box
                        width="100%"
                        height={theme.spacing(20)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://tse4.mm.bing.net/th/id/OIP._LBhB5EFoINIeSV_2ipKCAAAAA?pid=Api&P=0&h=180"
                        />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            <ListItemLink icon={<TaskIcon />} to="/" label="Atividades" onClick={toggleDrawerOpen}/>
                            <ListItemLink icon={<PeopleIcon />} to="/Profile" label="Perfil" onClick={undefined}/>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};
