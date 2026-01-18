import { useNavigate, useParams } from 'react-router-dom';
import { BasePageLayout } from '../../shared/layouts';
import { DetailToolbar } from '../../shared/components/DetailToolbar/DetailToolbar';

export const TaskDatail = () => {
    const { task_id = 'new' } = useParams<'task_id'>();
    const Navigate = useNavigate();

    const handleSave =( ) => {

    }
    const handleDelete=()=>{

    }
    
    return (
        <BasePageLayout
            title="Detalhe de pessoa"
            toolbar={
                <DetailToolbar
                    newButtonText="Nova"
                    showSaveAndCloseButton
                    showNewButton={task_id != 'new'}
                    showDeleteButton={task_id != 'new'}
                    onClickSaveButton={handleSave}
                    onClickSaveAndCloseButton={handleSave}
                    onClickDeleteButton={handleDelete}
                    onClickPreviousButton={() => Navigate('/tasks')}
                    onClickNewButton={() => Navigate('/tasks/detail/new')}
                />
            }
        >
            <p>Detalhe de atividade</p>
        </BasePageLayout>
    );
};
