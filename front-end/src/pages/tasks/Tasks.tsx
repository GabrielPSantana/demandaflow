import { DetailToolbar } from '../../shared/components/DetailToolbar/DetailToolbar';
import { useDrawerContext } from '../../shared/contexts';
import { BasePageLayout } from '../../shared/layouts';

export default function Tasks() {
    const { toggleDrawerOpen } = useDrawerContext();
    
    return (
        <BasePageLayout title="Atividades" toolbar={<DetailToolbar showLoadingSaveAndCloseButton={true}/>}>
            Testando task
        </BasePageLayout>
    );
}
