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

type EditTwitModalProps = {
    editTwitOpen: boolean;
    handleEditTwitClose: () => void;
    onEdit: (event: any) => void;
    default: string,
}

export function EditTwitModal(props: EditTwitModalProps){
    return (
        <Modal
            open={props.editTwitOpen}
            onClose={props.handleEditTwitClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxModalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Редактирование Твита
                </Typography>
                <form onSubmit={
                    (event) => {
                        props.onEdit(event)
                        props.handleEditTwitClose()
                    } 
                    }>
                    <StackPanel orientation={"vertical"}>
                        <TextField defaultValue={props.default} placeholder="Текст" name="text" multiline size="small" maxRows={5} />
                        <Button type="submit">Редактировать Твит</Button>
                    </StackPanel>
                </form>
            </Box>
        </Modal>
    )
}