import styled from 'styled-components';
import { MobileProvider } from './MobileContext';
import MainComponent from './components/MainComponent';

const App = () => {
    return (
        <Wrapper>
            <MobileProvider>
                <MainComponent />
            </MobileProvider>
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
