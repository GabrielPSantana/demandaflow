import { Box, Button, Divider, Paper, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IDetailToolbar {
    newButtonText?: string;
    showNewButton?: boolean;
    showPreviousButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveAndCloseButton?: boolean;

    onClickNewButton?: () => void;
    onClickPreviousButton?: () => void;
    onClickDeleteButton?: () => void;
    onClickSaveButton?: () => void;
    onClickSaveAndCloseButton?: () => void;
}

export const DetailToolbar = ({
    showNewButton = true,
    showPreviousButton = true,
    showDeleteButton = true,
    showSaveButton = true,
    showSaveAndCloseButton = false,

    newButtonText = 'New',

    onClickNewButton,
    onClickPreviousButton,
    onClickDeleteButton,
    onClickSaveButton,
    onClickSaveAndCloseButton,
}: IDetailToolbar) => {
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
            {showSaveButton && (
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<SaveIcon />}
                    onClick={onClickSaveButton}
                >
                    Salvar
                </Button>
            )}

            {showSaveAndCloseButton && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<SaveIcon />}
                    onClick={onClickSaveAndCloseButton}
                >
                    Salvar e voltar
                </Button>
            )}

            {showDeleteButton && (
                <Button
                    variant="outlined"
                    color="error"
                    disableElevation
                    startIcon={<DeleteIcon />}
                    onClick={onClickDeleteButton}
                >
                    Apagar
                </Button>
            )}

            {showNewButton && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={onClickNewButton}
                >
                    {newButtonText ?? 'Novo'}
                </Button>
            )}

            {(showPreviousButton) && (
                <Divider variant="middle" orientation="vertical" flexItem />
            )}

            {showPreviousButton && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<ArrowBackIcon />}
                    onClick={onClickPreviousButton}
                >
                    Voltar
                </Button>
            )}
        </Box>
    );
};
