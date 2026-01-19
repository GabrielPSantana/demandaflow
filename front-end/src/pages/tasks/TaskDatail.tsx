import { useNavigate, useParams } from 'react-router-dom';
import { BasePageLayout } from '../../shared/layouts';
import { DetailToolbar } from '../../shared/components/DetailToolbar/DetailToolbar';
import { useEffect, useRef, useState } from 'react';
import { TasksService, type ITaskList } from '../../shared/services/api/tasks/TasksService';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Form } from '@unform/web';
import { VSelectField, VTextField } from '../../shared/forms';
import type { FormHandles } from '@unform/core';

export const TaskDatail = () => {
    const { task_id = 'new' } = useParams<'task_id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [taskName, setTaskName] = useState('');

    const handleSave = (dados: ITaskList) => {
        console.log(dados);
        setIsLoading(true);
        if (task_id == 'new') {
            TasksService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro salvo com sucesso');
                    navigate(`/tasks/detail/${result.task_id}`);
                }
            });
        } else {
            TasksService.updateById(task_id, dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro salvo com sucesso');
                    navigate(`/tasks/detail/${result.task_id}`);
                }
            });
        }
    };

    const handleDelete = (task_id: string) => {
        if (confirm('Realmente deseja apagar?')) {
            TasksService.removeById(task_id).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro apagado com sucesso');
                    navigate('/tasks');
                }
            });
        }
    };

    useEffect(() => {
        if (task_id != 'new') {
            setIsLoading(true);
            TasksService.getById(task_id).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTaskName(result.title);
                    formRef.current?.setData(result);
                }
            });
        }
    }, [task_id]);

    return (
        <BasePageLayout
            title={task_id === 'new' ? 'Nova Atividade' : taskName}
            toolbar={
                <DetailToolbar
                    newButtonText="Nova"
                    showSaveAndCloseButton
                    showNewButton={task_id != 'new'}
                    showDeleteButton={task_id != 'new'}
                    onClickSaveButton={() => formRef.current?.submitForm()}
                    onClickSaveAndCloseButton={() => formRef.current?.submitForm()}
                    onClickDeleteButton={() => handleDelete(task_id)}
                    onClickPreviousButton={() => navigate('/tasks')}
                    onClickNewButton={() => navigate('/tasks/detail/new')}
                />
            }
        >
            <Form ref={formRef} onSubmit={handleSave}>
                <Box
                    margin={1}
                    display="flex"
                    flexDirection="column"
                    component={Paper}
                    variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>
                        {isLoading && (
                            <Grid>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}
                        <Grid>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>
                        <Grid container direction="row" spacing={2}>
                            <Grid component="div" size={{ xs: 12, lg: 12 }}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Título"
                                    name="title"
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 2 }}>
                                <VSelectField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Prioridade"
                                    name="priority"
                                    options={[
                                        { value: 'LOW', label: 'Baixa' },
                                        { value: 'MEDIUM', label: 'Média' },
                                        { value: 'HIGH', label: 'Alta' },
                                        { value: 'CRITICAL', label: 'Crítica' },
                                    ]}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 2 }}>
                                <VSelectField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Status"
                                    name="status"
                                    options={[
                                        { value: 'PENDING', label: 'Pendente' },
                                        { value: 'IN_PROGRESS', label: 'Em andamento' },
                                        { value: 'COMPLETED', label: 'Concluída' },
                                    ]}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 2 }}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Data de início"
                                    name="start_datetime"
                                    type="datetime-local"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 2 }}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Data de finalização"
                                    name="end_datetime"
                                    type="datetime-local"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" spacing={2}>
                            <Grid size={{ xs: 12, lg: 12 }}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    multiline
                                    rows={4}
                                    label="Descricão"
                                    name="description"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </BasePageLayout>
    );
};
