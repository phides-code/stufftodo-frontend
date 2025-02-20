import styled from 'styled-components';
import TasksList from './components/TasksList';

const App = () => {
    return (
        <Wrapper>
            <TasksList />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 30rem;
    margin: 0.5rem auto;
`;

export default App;
