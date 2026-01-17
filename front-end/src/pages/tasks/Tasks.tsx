import {  useSearchParams } from 'react-router-dom';
import { ListToolbar } from '../../shared/components/ListToolbar/ListToolbar';
import { BasePageLayout } from '../../shared/layouts';
import { useMemo } from 'react';

export default function Tasks() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    return (
        <BasePageLayout
            title="Atividades"
            toolbar={
                <ListToolbar
                    showSearchInput
                    searchText={search}
                    newButtonText="Nova"
                    onSearchTextChange={(text) =>
                        setSearchParams({ search: text }, { replace: true })
                    }
                />
            }
        >
            Testando task
        </BasePageLayout>
    );
}
