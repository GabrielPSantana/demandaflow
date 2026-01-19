import { useNavigate, useParams } from 'react-router-dom';
import { BasePageLayout } from '../../shared/layouts';
import { DetailToolbar } from '../../shared/components/DetailToolbar/DetailToolbar';
import { useEffect, useRef, useState } from 'react';
import { TasksService, type ITaskList } from '../../shared/services/api/tasks/TasksService';
import { Box, LinearProgress, Grid, Paper, Typography } from '@mui/material';
import { VForm, VSelectField, VTextField } from '../../shared/forms';
import type { FormHandles } from '@unform/core';
import * as yup from 'yup';
import Swal from 'sweetalert2';

export const formValidationSchema = yup.object({
    title: yup
        .string()
        .required('Título é obrigatório')
        .min(5, 'Título deve ter no mínimo 5 caracteres')
        .max(30, 'Título deve ter no máximo 30 caracteres'),

    description: yup
        .string()
        .required('Descrição é obrigatória')
        .min(3, 'Descrição deve ter no mínimo 3 caracteres')
        .max(250, 'Descrição deve ter no máximo 250 caracteres'),

    priority: yup.string().required('Prioridade é obrigatória'),
    status: yup.string().required('Status é obrigatório'),
    start_datetime: yup.string().required('Data inicial é obrigatória'),
    end_datetime: yup.string().nullable(),
}) as yup.ObjectSchema<ITaskList>;

export const TaskDatail = () => {
    const { task_id = 'new' } = useParams<'task_id'>();
    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [taskName, setTaskName] = useState('');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: true,
    });

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
        } else {
            formRef.current?.setData({
                title: '',
                priority: '',
                description: '',
                start_datetime: '',
                end_datetime: '',
            });
        }
    }, [task_id]);

    const handleSave = (dados: ITaskList) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);
                if (task_id == 'new') {
                    TasksService.create(dadosValidados).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            alert('Registro salvo com sucesso');
                            navigate(`/tasks/detail/${result.task_id}`);
                        }
                    });
                } else {
                    TasksService.updateById(task_id, dadosValidados).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            alert('Registro salvo com sucesso');
                            navigate(`/tasks/detail/${result.task_id}`);
                        }
                    });
                }
            })
            .catch((error: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {};

                error.inner.forEach((error) => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            });
    };

    const handleDelete = (task_id: string) => {
        swalWithBootstrapButtons
            .fire({
                title: 'Você tem certeza?',
                text: 'Você não poderá reverter isso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    TasksService.removeById(task_id).then((result) => {
                        if (result instanceof Error) {
                            swalWithBootstrapButtons.fire({
                                title: 'Erro ao exluir atividade',
                                text: 'Contate o admnistrador do sistema',
                                icon: 'warning',
                            });
                        } else {
                            swalWithBootstrapButtons.fire({
                                title: 'Excluída!',
                                text: 'Sua atividade foi excluída.',
                                icon: 'success',
                            });
                            navigate('/tasks');
                        }
                    });
                }
            });
    };

    return (
        <BasePageLayout
            title={task_id === 'new' ? 'Nova Atividade' : taskName}
            toolbar={
                <DetailToolbar
                    newButtonText="Nova"
                    showNewButton={task_id != 'new'}
                    showDeleteButton={task_id != 'new'}
                    onClickSaveButton={() => formRef.current?.submitForm()}
                    onClickDeleteButton={() => handleDelete(task_id)}
                    onClickPreviousButton={() => navigate('/tasks')}
                    onClickNewButton={() => navigate('/tasks/detail/new')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave} {...({} as any)}>
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
            </VForm>
        </BasePageLayout>
    );
};
