import { useDrawerContext } from '../../shared/contexts';
import { BasePageLayout } from '../../shared/layouts';

export default function Tasks() {
    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <BasePageLayout title="Atividades" barraDeFerramentas={<>barraDeFerramentas</>}>
            Testando task
        </BasePageLayout>
    );
}
