import styled from 'styled-components';
import type { Task } from '../features/tasks/tasksApiSlice';
import { useGetTasksQuery } from '../features/tasks/tasksApiSlice';
import TaskCard from './TaskCard';

const TasksList = () => {
    const { data, error, isLoading } = useGetTasksQuery();

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks</p>;

    const tasks = data?.data as Task[];

    if (tasks.length === 0) return <p>No tasks found</p>;

    return (
        <Wrapper>
            <ListHeader>
                <ListHeaderText>Tasks:</ListHeaderText>
                <CreateButton>New Task</CreateButton>
            </ListHeader>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border: 1px solid grey;
    padding: 1rem;
`;

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const ListHeaderText = styled.div``;

const CreateButton = styled.button``;

export default TasksList;
