import styled from 'styled-components';
import type { Task } from '../features/tasks/tasksApiSlice';
import { useGetTasksQuery } from '../features/tasks/tasksApiSlice';
import TaskCard from './TaskCard';
import NewTaskDialog from './NewTaskDialog';
import { useState } from 'react';

const TasksList = () => {
    const { data, isLoading, isError, isSuccess, refetch, isFetching } =
        useGetTasksQuery();

    const [showNewTaskDialog, setShowNewTaskDialog] = useState<boolean>(false);

    if (isLoading) return <p>Loading tasks...</p>;
    if (isError || !isSuccess) {
        return <p>Error loading tasks</p>;
    }
    const tasks = data?.data as Task[];

    if (tasks.length === 0) return <p>No tasks found</p>;

    const sortTasks = (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) => {
            // Sort by taskStatus: PENDING before COMPLETED
            if (a.taskStatus === 'PENDING' && b.taskStatus !== 'PENDING')
                return -1;
            if (a.taskStatus !== 'PENDING' && b.taskStatus === 'PENDING')
                return 1;

            // Within PENDING tasks, sort by createdOn (descending)
            if (a.taskStatus === 'PENDING' && b.taskStatus === 'PENDING') {
                return b.createdOn - a.createdOn;
            }

            // Within COMPLETED tasks, sort by completedOn (descending)
            if (a.taskStatus === 'COMPLETED' && b.taskStatus === 'COMPLETED') {
                return b.completedOn - a.completedOn;
            }

            return 0; // If statuses and dates are equal
        });
    };

    const handleRefresh = () => {
        refetch();
    };

    const sortedTasks = sortTasks(tasks);

    return (
        <Wrapper>
            <ListHeader>
                <ListHeaderText>Tasks</ListHeaderText>
                <ButtonArea>
                    <CreateButton onClick={() => setShowNewTaskDialog(true)}>
                        New Task
                    </CreateButton>
                    <RefreshButton
                        onClick={handleRefresh}
                        disabled={isFetching}
                    >
                        Refresh
                    </RefreshButton>
                </ButtonArea>
            </ListHeader>
            {showNewTaskDialog && (
                <NewTaskDialog setShowNewTaskDialog={setShowNewTaskDialog} />
            )}
            {sortedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border: 1px solid grey;
    padding: 0.5rem;
`;

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const ListHeaderText = styled.div`
    font-weight: bold;
`;

const ButtonArea = styled.div``;

const BaseButton = styled.button`
    height: 2rem;
    margin-left: 0.5rem;
    border: 1px solid grey;
    border-radius: 0.5rem;
`;

const CreateButton = styled(BaseButton)`
    background-color: green;
    color: white;
`;
const RefreshButton = styled(BaseButton)``;

export default TasksList;
