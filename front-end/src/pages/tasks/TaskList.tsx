import { useSearchParams } from 'react-router-dom';
import { ListToolbar } from '../../shared/components/ListToolbar/ListToolbar';
import { BasePageLayout } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { TasksService, type ITaskList } from '../../shared/services/api/tasks/TasksService';
import { useDebounce } from '../../shared/hooks';
import {
    IconButton,
    LinearProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Environment } from '../../shared/environment';

type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export default function TasksList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rowsTasks, setRowTaks] = useState<ITaskList[]>([]);
    const [totalCountTasks, setTotalCountTaks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const priorityColorMap: Record<Priority, string> = {
        CRITICAL: 'error.main',
        HIGH: 'warning.main',
        MEDIUM: 'info.main',
        LOW: 'success.main',
    };

    const statusLabelMap: Record<Status, string> = {
        PENDING: 'Pedente',
        IN_PROGRESS: 'Em progresso',
        COMPLETED: 'Completo',
    };

    const priorityLabelMap: Record<Priority, string> = {
        CRITICAL: 'Crítico',
        HIGH: 'Alto',
        MEDIUM: 'Médio',
        LOW: 'Baixo',
    };

    const page = useMemo(() => {
        return Number(searchParams.get('page') || '1');
    }, [searchParams]);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            TasksService.getAll(search, page).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    return;
                }

                setRowTaks(result.data);
                setTotalCountTaks(result.totalCount);
            });
        });
    }, [search, page]);

    return (
        <BasePageLayout
            title="Atividades"
            toolbar={
                <ListToolbar
                    showSearchInput
                    searchText={search}
                    newButtonText="Nova"
                    onSearchTextChange={(text) =>
                        setSearchParams({ page: '1', search: text }, { replace: true })
                    }
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Prioridade</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Data de início</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Data de término</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tempo gasto</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rowsTasks.map((row) => (
                            <TableRow hover key={row.task_id} sx={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <IconButton size='small'>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size='small'>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.title}</TableCell>

                                <TableCell
                                    sx={{
                                        color: priorityColorMap[row.priority as Priority],
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {priorityLabelMap[row.priority as Priority]}
                                </TableCell>

                                <TableCell>{statusLabelMap[row.status as Status]}</TableCell>

                                <TableCell>
                                    {new Date(row.start_datetime).toLocaleString()}
                                </TableCell>

                                <TableCell>{new Date(row.end_datetime).toLocaleString()}</TableCell>

                                <TableCell>{row.time_spent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCountTasks === 0 && !isLoading && (
                        <caption>{Environment.EMPTY_LISTING}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}

                        {totalCountTasks > 0 && totalCountTasks > Environment.LINE_LIMIT && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Pagination
                                        page={page}
                                        count={totalCountTasks}
                                        shape="rounded"
                                        onChange={(_, newPage) =>
                                            setSearchParams(
                                                { page: newPage.toString(), search },
                                                { replace: true },
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </BasePageLayout>
    );
}
