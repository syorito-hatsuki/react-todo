import {useEffect, useState} from 'react'
import {useSnackbar} from "notistack";
import {Add, Delete, Edit} from "@mui/icons-material";
import {Card, Container, IconButton, Stack, Typography} from "@mui/material";
import {addButton, container, textWrap} from "./AppStyle.ts";
import {loadTodos, saveTodos} from "./localStorage.ts";
import CreateTaskDialog from "./dialogs/CreateTaskDialog.tsx";
import EditTaskDialog from "./dialogs/EditTaskDialog.tsx";

export default function App() {
    const {enqueueSnackbar} = useSnackbar();

    const [todos, setTodos] = useState<string[]>(loadTodos)
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [selectedTask, setSelectedTask] = useState("")

    const addTodo = (todo: string) => {
        setTodos(oldArray => [...oldArray, todo])
        enqueueSnackbar(`Task added`, {variant: "success"})
    }

    const editTodo = (index: number, todo: string) => {
        setTodos([
            ...todos.slice(0, index),
            todo,
            ...todos.slice(index + 1)
        ])
        enqueueSnackbar(`Task updated`, {variant: "info"})
    }

    const removeTodo = (index: number) => {
        setTodos([
            ...todos.slice(0, index),
            ...todos.slice(index + 1, todos.length)
        ]);
        enqueueSnackbar(`Task removed`, {variant: "error"})
    }

    useEffect(() => {
        saveTodos(todos)
    }, [todos])

    return (
        <>
            <CreateTaskDialog open={createOpen} setOpen={setCreateOpen} addTodo={addTodo}/>
            <EditTaskDialog index={selectedIndex} text={selectedTask} open={editOpen} setOpen={setEditOpen}
                            editTodo={editTodo}/>
            <Container maxWidth="xl" style={container}>
                <Stack spacing={2}>
                    <IconButton style={addButton} onClick={() => {
                        setSelectedTask("")
                        setCreateOpen(true)
                    }}>
                        <Add/>
                    </IconButton>
                    {todos.map((todo, index) =>
                        <Card style={container} key={index}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body1" flexGrow={1} paddingLeft={1} style={textWrap}>
                                    {todo}
                                </Typography>
                                <IconButton onClick={() => {
                                    setSelectedTask(todo)
                                    setSelectedIndex(index)
                                    setEditOpen(true)
                                }}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={() => removeTodo(index)}>
                                    <Delete/>
                                </IconButton>
                            </Stack>
                        </Card>
                    )}
                </Stack>
            </Container>
        </>
    )
}