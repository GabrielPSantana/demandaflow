import { Box, Button, Divider, Paper, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const DetailToolbar = () => {
    const theme = useTheme();
 
    return (
        <Box
            display="flex"
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            alignItems="center"
            height={theme.spacing(6)}
            component={Paper}
        >
            <Button variant="contained" color="primary" disableElevation startIcon={<SaveIcon />}>
                Salvar
            </Button>

            <Button variant="outlined" color="primary" disableElevation startIcon={<SaveIcon />}>
                Salvar e voltar
            </Button>

            <Button variant="outlined" color="primary" disableElevation startIcon={<DeleteIcon />}>
                Apagar
            </Button>

            <Button variant="outlined" color="primary" disableElevation startIcon={<AddIcon />}>
                Novo
            </Button>

            <Divider variant="middle" orientation="vertical" />

            <Button
                variant="outlined"
                color="primary"
                disableElevation
                startIcon={<ArrowBackIcon />}
            >
                Voltar
            </Button>
        </Box>
    );
};
