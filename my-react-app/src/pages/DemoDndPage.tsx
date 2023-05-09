import { Card, Grid, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
    ResponderProvided,
} from 'react-beautiful-dnd'

function Item({ itemName, index }: { itemName: string; index: number }) {
    return (
        <Draggable draggableId={itemName} index={index}>
            {(provided) => (
                <Paper
                    ref={provided.innerRef}
                    variant="outlined"
                    sx={{
                        p: 4,
                    }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {itemName}
                </Paper>
            )}
        </Draggable>
    )
}

function Column({
    columnName,
    lists,
}: {
    columnName: string
    lists: string[]
}) {
    return (
        <Droppable droppableId={columnName}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    sx={{
                        height: '70vh',
                        p: 2,
                    }}
                    {...provided.droppableProps}
                >
                    <Typography>{columnName}</Typography>
                    <Stack spacing={2}>
                        {lists.map((item, index) => (
                            <Item itemName={item} index={index} key={item} />
                        ))}
                    </Stack>
                </Card>
            )}
        </Droppable>
    )
}
function Board({
    todoLists,
    doingLists,
    doneLists,
}: {
    todoLists: string[]
    doingLists: string[]
    doneLists: string[]
}) {
    return (
        <Card
            sx={{
                p: 2,
                backgroundColor: 'gray',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Column columnName="todo" lists={todoLists} />
                </Grid>
                <Grid item xs={4}>
                    <Column columnName="doing" lists={doingLists} />
                </Grid>
                <Grid item xs={4}>
                    <Column columnName="done" lists={doneLists} />
                </Grid>
            </Grid>
        </Card>
    )
}
function DemoDndPage() {
    const [todoLists, setTodoLists] = useState<string[]>([
        'create a login page',
    ])
    const [doingLists, setDoingLists] = useState([
        'implement api',
        'test a UAT web',
    ])
    const [doneLists, setDoneLists] = useState(['meeting'])

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const { source, destination, draggableId } = result

        if (!destination) {
            return
        }
        const { droppableId: sourceID, index: sourceIndex } = source

        const { droppableId: desID, index: desIndex } = destination

        console.log('source: ', source)
        console.log('destination: ', destination)

        // drag change column
        if (sourceID !== desID) {
            // remove source
            if (sourceID === 'todo') {
                setTodoLists((prev) => prev.filter((f) => f !== draggableId))
            } else if (sourceID === 'doing') {
                setDoingLists((prev) => prev.filter((f) => f !== draggableId))
            } else if (sourceID === 'done') {
                setDoneLists((prev) => prev.filter((f) => f !== draggableId))
            }

            if (desID === 'todo') {
                setTodoLists((prev) => {
                    prev.splice(desIndex, 0, draggableId)
                    return prev
                })
            } else if (desID === 'doing') {
                console.log("asdasd" + draggableId)
                setDoingLists((prev) => {
                    prev.splice(desIndex, 0, draggableId)
                    return prev
                })
            } else if (desID === 'done') {
                setDoneLists((prev) => {
                    prev.splice(desIndex, 0, draggableId)
                    return prev
                })
            }
        } else if (sourceID === desID) {
            if (desID === 'todo') {
                setTodoLists((prev) => {
                    prev.splice(sourceIndex, 1)
                    prev.splice(desIndex, 0, draggableId)
                    return prev
                })
            }
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Board
                todoLists={todoLists}
                doingLists={doingLists}
                doneLists={doneLists}
            />
        </DragDropContext>
    )
}
export default DemoDndPage