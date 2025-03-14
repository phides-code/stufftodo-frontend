import styled from 'styled-components';
import {
    useDeleteTaskMutation,
    useGetTasksQuery,
    usePutTaskMutation,
    type Task,
} from '../features/tasks/tasksApiSlice';
import { useState } from 'react';

interface TaskCardProps {
    task: Task;
}

const MAX_LENGTH = 100;

const TaskCard = ({ task }: TaskCardProps) => {
    const [
        deleteTask,
        { isLoading: isDeleteLoading, isError: errorWhileDeleting },
    ] = useDeleteTaskMutation();
    const [putTask, { isLoading: isPutLoading, isError: errorWhileUpdating }] =
        usePutTaskMutation();
    const { refetch, isFetching: isGetFetching } = useGetTasksQuery();

    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [editedTaskContent, setEditedTaskContent] = useState<string>('');

    // ensure isLoading state is only associated with this task ID
    const [thisId, setThisId] = useState<string>('');
    const isLoading =
        (isDeleteLoading || isPutLoading || isGetFetching) &&
        thisId === task.id;

    const buildDateString = (epochTime: number): string => {
        const d = new Date(epochTime);
        return d.toDateString() + ', ' + d.toLocaleTimeString();
    };

    const truncate = (str: string) => {
        if (str.length > MAX_LENGTH) {
            return str.substring(0, MAX_LENGTH) + ' (truncated)';
        }

        return str;
    };

    const handleDelete = async () => {
        try {
            setThisId(task.id);

            const deleteResult = await deleteTask(task.id).unwrap();

            if (deleteResult.errorMessage) {
                throw new Error(deleteResult.errorMessage);
            }

            await refetch();
        } catch (err) {
            console.error('Error deleting task:', err);
        } finally {
            setThisId('');
        }
    };

    const handleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedTaskContent(ev.target.value);
    };

    const handleSave = async (ev: React.FormEvent) => {
        ev.preventDefault();

        try {
            setThisId(task.id);
            const putResult = await putTask({
                ...task,
                content: editedTaskContent,
            }).unwrap();

            if (putResult.errorMessage) {
                throw new Error(putResult.errorMessage);
            }

            await refetch();
            setEditingMode(false);
        } catch (err) {
            console.error('Error updating task: ', err);
        } finally {
            setThisId('');
        }
    };

    const handleMarkDone = async (
        ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        ev.preventDefault();

        try {
            setThisId(task.id);
            const putResult = await putTask({
                ...task,
                taskStatus: 'COMPLETED',
            }).unwrap();

            if (putResult.errorMessage) {
                throw new Error(putResult.errorMessage);
            }

            await refetch();
        } catch (err) {
            console.error('Error updating task: ', err);
        } finally {
            setThisId('');
        }
    };

    const enableEditingMode = () => {
        setEditedTaskContent(task.content);
        setEditingMode(true);
    };

    const TaskContent = () => (
        <div title={'Created on ' + buildDateString(task.createdOn)}>
            {truncate(task.content)}
        </div>
    );

    const DeleteButton = () => (
        <StyledDeleteButton disabled={isLoading} onClick={handleDelete}>
            Delete
        </StyledDeleteButton>
    );

    if (editingMode) {
        return (
            <Wrapper>
                <form onSubmit={handleSave}>
                    <TaskInputArea>
                        <InputTitle>Editing Task:</InputTitle>
                        <StyledTextArea
                            disabled={isLoading}
                            value={editedTaskContent}
                            onChange={handleOnChange}
                        />
                        {errorWhileUpdating && (
                            <EditingErrorMessage>
                                Error updating task
                            </EditingErrorMessage>
                        )}
                    </TaskInputArea>
                    <EditingButtonArea>
                        <SaveButton disabled={isLoading}>Save</SaveButton>
                        <CancelButton
                            disabled={isLoading}
                            onClick={() => setEditingMode(false)}
                        >
                            Cancel
                        </CancelButton>
                    </EditingButtonArea>
                </form>
            </Wrapper>
        );
    }

    if (task.taskStatus === 'COMPLETED') {
        return (
            <Wrapper>
                <CompletedTaskText>
                    <TaskContent />
                    {errorWhileDeleting && (
                        <ErrorMessage>Error deleting task</ErrorMessage>
                    )}
                    <CompletedDate>
                        {`Completed on ` + buildDateString(task.completedOn)}
                    </CompletedDate>
                </CompletedTaskText>
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
            <TaskText>
                <TaskContent />
                {errorWhileDeleting && (
                    <ErrorMessage>Error deleting task</ErrorMessage>
                )}
                {errorWhileUpdating && (
                    <ErrorMessage>Error updating task</ErrorMessage>
                )}
            </TaskText>

            <ButtonArea>
                <ButtonTopRow>
                    <EditButton
                        disabled={isLoading}
                        onClick={enableEditingMode}
                    >
                        Edit
                    </EditButton>
                    <DeleteButton />
                </ButtonTopRow>

                <MarkDoneButton onClick={handleMarkDone} disabled={isLoading}>
                    Mark Done
                </MarkDoneButton>
            </ButtonArea>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
`;

const TaskText = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 0.5rem;
    justify-content: center;
`;

const CompletedTaskText = styled(TaskText)`
    color: grey;
`;

const CompletedDate = styled.div`
    font-size: small;
`;

const ButtonArea = styled.div``;

const ButtonTopRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BaseButton = styled.button`
    height: 2rem;
    margin-left: 0.2rem;
    border: 1px solid grey;
    border-radius: 0.5rem;
`;

const EditButton = styled(BaseButton)`
    width: 3rem;
`;
const MarkDoneButton = styled(BaseButton)`
    margin-top: 0.2rem;
    width: 93%;
    margin-left: 0.2rem;
    background-color: green;
    color: white;
`;

const StyledDeleteButton = styled(BaseButton)`
    background-color: red;
    color: white;
`;

const TaskInputArea = styled.div``;
const InputTitle = styled.div``;

const StyledTextArea = styled.textarea`
    resize: none;
    height: 3.5rem;
    width: 100%;
`;

const EditingButtonArea = styled.div`
    display: flex;
    align-items: center;
`;

const SaveButton = styled(BaseButton)``;
const CancelButton = styled(BaseButton)``;

const ErrorMessage = styled.div`
    color: red;
`;

const EditingErrorMessage = styled(ErrorMessage)`
    margin-bottom: 0.5rem;
`;

export default TaskCard;
