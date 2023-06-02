import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { StackPanel } from 'src/ui';

const BoxModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type CreateTwitModalProps = {
    createTwitOpen: boolean;
    handleCreateTwitClose: () => void;
    onSubmit: (event: any) => void;
}

export function CreateTwitModal(props: CreateTwitModalProps){
    return (
        <Modal
            open={props.createTwitOpen}
            onClose={props.handleCreateTwitClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxModalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Создание Твита
                </Typography>
                <form onSubmit={
                    (event) => {
                        props.onSubmit(event)
                        props.handleCreateTwitClose()
                    } 
                    }>
                    <StackPanel orientation={"vertical"}>
                        <TextField placeholder="Текст" name="text" multiline size="small" maxRows={5} />
                        <Button type="submit">Создать Твит</Button>
                    </StackPanel>
                </form>
            </Box>
        </Modal>
    )
}