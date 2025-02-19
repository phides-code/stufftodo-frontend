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
    height: 100vh;
    width: 100vw;
`;

export default App;
