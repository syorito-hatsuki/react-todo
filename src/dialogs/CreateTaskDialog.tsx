import {Dispatch, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, TextField} from "@mui/material";

export default function CreateTaskDialog(props: {
    open: boolean,
    setOpen: Dispatch<boolean>,
    addTodo: (todo: string) => void
}) {

    const [text, setText] = useState("")

    const handleSave = () => {
        props.setOpen(false);
        props.addTodo(text)
        setText("")
    };

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogContent>
                <TextField multiline defaultValue={text} onChange={(event) => setText(event.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={text.trim().length <= 0} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}