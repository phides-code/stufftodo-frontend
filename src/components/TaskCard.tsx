import styled from 'styled-components';
import type { Task } from '../features/tasks/tasksApiSlice';

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <Wrapper>
            <TaskText>{task.content}</TaskText>
            <ButtonArea>
                <MarkDoneButton>Mark Done</MarkDoneButton>
                <DeleteButton>Delete</DeleteButton>
            </ButtonArea>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
    padding: 1rem;
`;

const TaskText = styled.div`
    margin-right: 1rem;
`;

const ButtonArea = styled.div`
    display: flex;
`;
const MarkDoneButton = styled.button``;
const DeleteButton = styled.button``;

export default TaskCard;
