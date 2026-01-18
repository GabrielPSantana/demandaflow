import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface ITaskList {
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

export interface IResponseList {
    count: number;
    next: string | null;
    previous: string | null;
    results: ITaskList[];
}

type ITasksWithTotalCount = {
    data: ITaskList[];
    totalCount: number;
};

const getAll = async (search: string, page: number): Promise<ITasksWithTotalCount | Error> => {
    try {
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}?page=${page}&search=${search}`;

        const { data } = await Api.get<IResponseList>(relativeUrl);

        if (data) {
            return {
                data: data.results,
                totalCount: data.count,
            };
        }

        return new Error('Error listing tasks');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Error listing tasks');
    }
};

const getById = async (task_id: string | number): Promise<ITaskList | Error> => {
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

const create = async (taskData: Partial<ITaskList>): Promise<number | Error> => {
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
    taskData: Partial<ITaskList>,
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
        const relativeUrl = `${Environment.BASE_URL}${Environment.API_V1_TASK}delete/${task_id}/`;

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
    updateById,
    removeById,
};
