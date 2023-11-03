import {Button, Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import {Dispatch, useState} from "react";

export default function EditTaskDialog(props: {
    index: number,
    text: string,
    open: boolean,
    setOpen: Dispatch<boolean>,
    editTodo: (index: number, todo: string) => void
}) {

    const [text, setText] = useState("")

    const handleSave = () => {
        props.setOpen(false);
        props.editTodo(props.index, text)
        setText("")
    };

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogContent>
                <TextField multiline defaultValue={props.text}
                           onChange={(event) => setText(event.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={text.trim().length <= 0} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}