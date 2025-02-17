import styled from 'styled-components';
import type { Task } from '../features/tasks/tasksApiSlice';

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    if (task.taskStatus === 'COMPLETED') {
        return (
            <Wrapper>
                <CompletedTaskText>{task.content}</CompletedTaskText>
                <ButtonArea>
                    <ButtonTopRow>
                        <DeleteButton>Delete</DeleteButton>
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
                    <EditButton>Edit</EditButton>
                    <DeleteButton>Delete</DeleteButton>
                </ButtonTopRow>
                <MarkDoneButton>Mark Done</MarkDoneButton>
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
const DeleteButton = styled.button``;
const MarkDoneButton = styled.button`
    width: 100%;
`;

export default TaskCard;
