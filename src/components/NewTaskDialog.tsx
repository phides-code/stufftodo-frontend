import styled from 'styled-components';

interface NewTaskDialogProps {
    setShowNewTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTaskDialog = ({ setShowNewTaskDialog }: NewTaskDialogProps) => {
    return (
        <Wrapper>
            <TextArea>
                <InputTitle>New Task:</InputTitle>
                <StyledInput />
            </TextArea>
            <ButtonArea>
                <SaveButton>Save</SaveButton>
                <CancelButton onClick={() => setShowNewTaskDialog(false)}>
                    Cancel
                </CancelButton>
            </ButtonArea>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

const TextArea = styled.div``;

const InputTitle = styled.div``;

const StyledInput = styled.textarea`
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

export default NewTaskDialog;
