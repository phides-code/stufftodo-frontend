import styled from 'styled-components';
import {
    useDeleteTaskMutation,
    useGetTasksQuery,
    type Task,
} from '../features/tasks/tasksApiSlice';
import { useState } from 'react';

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const [deleteTask, { isLoading: isDeleteLoading }] =
        useDeleteTaskMutation();
    const { refetch, isFetching: isGetFetching } = useGetTasksQuery();

    // ensure isLoading state is only associated with this task ID
    const [thisId, setThisId] = useState<string>('');
    const isLoading = isDeleteLoading || (isGetFetching && thisId === task.id);

    const handleDelete = async () => {
        try {
            setThisId(task.id);
            await deleteTask(task.id);
            await refetch();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const DeleteButton = () => (
        <button disabled={isLoading} onClick={handleDelete}>
            Delete
        </button>
    );

    if (task.taskStatus === 'COMPLETED') {
        return (
            <Wrapper>
                <CompletedTaskText>{task.content}</CompletedTaskText>
                <ButtonArea>
                    <ButtonTopRow>
                        <DeleteButton />
                    </ButtonTopRow>
                </ButtonArea>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TaskText>{task.content}</TaskText>
            <ButtonArea>
                <ButtonTopRow>
                    <EditButton disabled={isLoading}>Edit</EditButton>
                    <DeleteButton />
                </ButtonTopRow>
                <MarkDoneButton disabled={isLoading}>Mark Done</MarkDoneButton>
            </ButtonArea>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
    padding: 0.5rem;
`;

const TaskText = styled.div`
    display: flex;
    margin-right: 0.5rem;
    align-items: center;
`;

const CompletedTaskText = styled(TaskText)`
    color: grey;
`;

const ButtonArea = styled.div``;

const ButtonTopRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const EditButton = styled.button``;
const MarkDoneButton = styled.button`
    width: 100%;
`;

export default TaskCard;
