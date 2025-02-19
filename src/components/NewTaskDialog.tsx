import { useState } from 'react';
import styled from 'styled-components';
import {
    useGetTasksQuery,
    usePostTaskMutation,
} from '../features/tasks/tasksApiSlice';

interface NewTaskDialogProps {
    setShowNewTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTaskDialog = ({ setShowNewTaskDialog }: NewTaskDialogProps) => {
    const [newTaskContent, setNewTaskContent] = useState<string>('');

    const [postTask, { isLoading: isPostLoading, isError }] =
        usePostTaskMutation();
    const { refetch, isFetching: isGetFetching } = useGetTasksQuery();

    const isLoading = isPostLoading || isGetFetching;

    const handleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTaskContent(ev.target.value);
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        try {
            const postResult = await postTask({
                content: newTaskContent,
            }).unwrap();

            if (postResult.errorMessage) {
                throw new Error(postResult.errorMessage);
            }

            await refetch();
            setShowNewTaskDialog(false);
        } catch (err) {
            console.error('Error creating new task: ', err);
        }
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <TaskInputArea>
                    <InputTitle>New Task:</InputTitle>
                    <StyledTextArea
                        disabled={isLoading}
                        value={newTaskContent}
                        onChange={handleOnChange}
                    />
                </TaskInputArea>
                {isError && (
                    <ErrorMessage>Error creating new task</ErrorMessage>
                )}
                <ButtonArea>
                    <SaveButton disabled={isLoading}>Save</SaveButton>
                    <CancelButton
                        disabled={isLoading}
                        onClick={() => setShowNewTaskDialog(false)}
                    >
                        Cancel
                    </CancelButton>
                </ButtonArea>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

const TaskInputArea = styled.div``;
const InputTitle = styled.div``;

const StyledTextArea = styled.textarea`
    resize: none;
    height: 3.5rem;
    width: 100%;
`;

const ButtonArea = styled.div`
    display: flex;
    align-items: center;
`;

const SaveButton = styled.button``;
const CancelButton = styled.button``;

const ErrorMessage = styled.div`
    margin-bottom: 0.5rem;
    color: red;
`;

export default NewTaskDialog;
