import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListingTask {
    task_id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    start_datetime: Date;
    end_datetime: Date;
    time_spent: string;
    team_id: string;
}

type ITasksWithTotalCount = {
    data: IListingTask[];
};

const getAll = async (): Promise<ITasksWithTotalCount | Error> => {
    try {
        const team_id = 'd4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b';

        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}?team_id=${team_id}`;

        const { data } = await Api.get(relativeUrl);

        if (data) {
            return { data };
        }

        return new Error('Error listing tasks');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error listing tasks');
    }
};

const getById = async (task_id: string | number): Promise<IListingTask | Error> => {
    try {
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}/${task_id}/`;

        const { data } = await Api.get(relativeUrl);

        if (data) {
            return data;
        }

        return new Error('Error fetching task');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error fetching task');
    }
};

const create = async (taskData: Partial<IListingTask>): Promise<number | Error> => {
    try {
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}/create/`;

        const { data } = await Api.post(relativeUrl, taskData);

        if (data) {
            return data;
        }

        return new Error('Error creating task');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error creating task');
    }
};

const updateById = async (
    task_id: string | number,
    taskData: Partial<IListingTask>,
): Promise<void | Error> => {
    try {
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}/update/${task_id}/`;
        const { data } = await Api.put(relativeUrl, taskData);

        if (data) {
            return data;
        }

        return new Error('Error updating task');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error updating task');
    }
};

const removeById = async (task_id: string | number): Promise<boolean | Error> => {
    try {
        const user_id = 'd4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b';
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}/${task_id}/${user_id}/delete`;
        await Api.delete(relativeUrl);
        return true;
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error deleting task');
    }
};

export const TasksService = {
    getAll,
    getById,
    create,
    update: updateById,
    remove: removeById,
};