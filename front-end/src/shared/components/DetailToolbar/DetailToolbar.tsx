import { Box, Button, Divider, Paper, Skeleton, useTheme } from '@mui/material';
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

    showLoadingNewButton?: boolean;
    showLoadingPreviousButton?: boolean;
    showLoadingDeleteButton?: boolean;
    showLoadingSaveButton?: boolean;
    showLoadingSaveAndCloseButton?: boolean;

    onClickNewButton?: () => void;
    onClickPreviousButton?: () => void;
    onClickDeleteButton?: () => void;
    onClickSaveButton?: () => void;
    onClickSaveAndCloseButton?: () => void;
}

export const DetailToolbar = ({
    newButtonText = 'Novo',

    showNewButton = true,
    showPreviousButton = true,
    showDeleteButton = true,
    showSaveButton = true,
    showSaveAndCloseButton = true,

    showLoadingNewButton = false,
    showLoadingPreviousButton = false,
    showLoadingDeleteButton = false,
    showLoadingSaveButton = false,
    showLoadingSaveAndCloseButton = false,

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
            {showSaveButton && !showLoadingSaveButton && (
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
            {showLoadingSaveButton && <Skeleton width={110} height={60} />}

            {showSaveAndCloseButton && !showLoadingSaveAndCloseButton && (
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
            {showLoadingSaveAndCloseButton && <Skeleton width={180} height={60} />}

            {showDeleteButton && !showLoadingDeleteButton && (
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
            {showLoadingDeleteButton && <Skeleton width={110} height={60} />}

            {showNewButton && !showLoadingNewButton && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={onClickNewButton}
                >
                    {newButtonText}
                </Button>
            )}
            {showLoadingNewButton && <Skeleton width={110} height={60} />}

            {showPreviousButton && <Divider variant="middle" orientation="vertical" flexItem />}
            {showPreviousButton && !showLoadingPreviousButton && (
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
            {showLoadingPreviousButton && <Skeleton width={110} height={60} />}
        </Box>
    );
};
