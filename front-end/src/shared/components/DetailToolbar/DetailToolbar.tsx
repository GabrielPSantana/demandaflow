import {
    Box,
    Button,
    Divider,
    Paper,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
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

    showLoadingNewButton?: boolean;
    showLoadingPreviousButton?: boolean;
    showLoadingDeleteButton?: boolean;
    showLoadingSaveButton?: boolean;

    onClickNewButton?: () => void;
    onClickPreviousButton?: () => void;
    onClickDeleteButton?: () => void;
    onClickSaveButton?: () => void;
}

export const DetailToolbar = ({
    newButtonText = 'Novo',

    showNewButton = true,
    showPreviousButton = true,
    showDeleteButton = true,
    showSaveButton = true,

    showLoadingNewButton = false,
    showLoadingPreviousButton = false,
    showLoadingDeleteButton = false,
    showLoadingSaveButton = false,

    onClickNewButton,
    onClickPreviousButton,
    onClickDeleteButton,
    onClickSaveButton,
}: IDetailToolbar) => {
    const theme = useTheme();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
            justifyContent="start"
        >
            {showSaveButton && !showLoadingSaveButton && (
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<SaveIcon />}
                    onClick={onClickSaveButton}
                >
                    {(!smDown || !mdDown) && (
                        <Typography
                            variant="button"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            overflow="hidden"
                        >
                            Salvar
                        </Typography>
                    )}
                </Button>
            )}
            {showLoadingSaveButton && <Skeleton width={110} height={60} />}

            {showDeleteButton && !showLoadingDeleteButton && (
                <Button
                    variant="outlined"
                    color="error"
                    disableElevation
                    startIcon={<DeleteIcon />}
                    onClick={onClickDeleteButton}
                >
                    {(!smDown || !mdDown) && (
                        <Typography
                            variant="button"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            overflow="hidden"
                        >
                            Apagar
                        </Typography>
                    )}
                </Button>
            )}
            {showLoadingDeleteButton && <Skeleton width={110} height={60} />}

            {showNewButton && !showLoadingNewButton && !smDown && !mdDown && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={onClickNewButton}
                >
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {newButtonText}
                    </Typography>
                </Button>
            )}
            {showLoadingNewButton && !smDown && !mdDown && <Skeleton width={110} height={60} />}

            {showPreviousButton && <Divider variant="middle" orientation="vertical" flexItem />}
            {showPreviousButton && !showLoadingPreviousButton && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    startIcon={<ArrowBackIcon />}
                    onClick={onClickPreviousButton}
                >
                    {(!smDown || !mdDown) && (
                        <Typography
                            variant="button"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            overflow="hidden"
                        >
                            Voltar
                        </Typography>
                    )}
                </Button>
            )}
            {showLoadingPreviousButton && <Skeleton width={110} height={60} />}
        </Box>
    );
};
