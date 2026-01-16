import { Box, Button, Paper, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Environment } from '../../environment';

interface IListToolbarPros {
    searchText?: string;
    showSearchInput?: boolean;
    onSearchTextChange?: (newText: string) => void;

    newButtonText?: string;
    showNewButton?: boolean;
    onClickNewButton?: () => void;
}

export const ListToolbar = ({
    searchText = '',
    showSearchInput = false,
    onSearchTextChange,
    newButtonText = 'Novo',
    showNewButton = true,
    onClickNewButton,
}: IListToolbarPros) => {
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
            {showSearchInput && (
                <TextField
                    value={searchText}
                    onChange={(event) => onSearchTextChange?.(event.target.value)}
                    size="small"
                    placeholder={Environment.SEARCH_INPUT_PLACEHOLDER}
                />
            )}
            <Box display="flex" justifyContent="end" flex={1}>
                {showNewButton && (
                    <Button
                        onClick={onClickNewButton}
                        variant="contained"
                        color="primary"
                        disableElevation
                        endIcon={<AddIcon />}
                    >
                        {newButtonText}
                    </Button>
                )}
            </Box>
        </Box>
    );
};
