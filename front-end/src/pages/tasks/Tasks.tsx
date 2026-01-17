import { useSearchParams } from 'react-router-dom';
import { ListToolbar } from '../../shared/components/ListToolbar/ListToolbar';
import { BasePageLayout } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { TasksService } from '../../shared/services/api/tasks/TasksService';
import { useDebounce } from '../../shared/hooks';

export default function Tasks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce()

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        debounce(()=> {
            TasksService.getAll()
                .then((result) => {
                    if(result instanceof Error){
                        alert(result.message)
                    }
                    console.log(result)
                });            
        })

    }, [search]);

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
