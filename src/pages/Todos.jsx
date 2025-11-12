import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Form, Table, Modal } from 'react-bootstrap'
import { fetchTodos } from '../data/todos'
const Todos = () => {

    const newIdRef = useRef()
    const newTitleRef = useRef()



    // [fetchTodos] -> todosRaw -> [filters] -> todos
    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [curPage, setCurPage] = useState(1)
    const [numPages, setNumPages] = useState(3)

    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, []) //load

    useEffect(() => {
        if (onlyWaiting) setTodos(todosRaw.filter((todo) => !todo.completed))
        else setTodos(todosRaw)
    }, [todosRaw, onlyWaiting])


    useEffect(() => {
        setNumPages(Math.ceil(todos.length / itemsPerPage))
    }, [todos, itemsPerPage])

    useEffect(() => {

        if (numPages <= 0) setCurPage(0)
        else {
            if (curPage > numPages) setCurPage(numPages)
            else if (curPage <= 0) setCurPage(1)
        }
    }, [numPages])

    const waitingClicked = (id) => {
        const foundTodo = todos.find((todo) => {
            return todo.id === id
        })
        foundTodo.completed = true

        setTodosRaw([...todosRaw])
    }

    const deleteClicked = (id) => {
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id))
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClicke = (id, title) => {

        if (title.trim() !== "") {

            setTodosRaw([...todosRaw, {
                userId: 1,
                id,
                title,
                completed: false,
            }])
        }
        newIdRef.current.value = ""
        newTitleRef.current.value = ""

        handleClose()
    }





    return (
        <>
            {/* filters */}
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <Form.Check // prettier-ignore
                        type='switch'
                        id='custom-switch'
                        // label='Show only waiting'
                        onChange={(e) => setOnlyWaiting(e.target.checked)}
                    />
                    <label htmlFor='custom-switch' style={{color:"gold"}}>
                        Show only&nbsp;
                        <Button variant='warning' style={{ pointerEvents: 'none' }}>
                            waiting&nbsp;<i className='bi bi-clock'></i>
                        </Button>
                    </label>
                </div>
                <Form.Select
                    aria-label='Default select example'
                    className='w-25'
                    onChange={(e) => setItemsPerPage(e.target.value)}
                >
                    <option value={5}>5 items per page</option>
                    <option value={10} selected>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </Form.Select>
            </div>
            {/* table */}
            <div className='mt-2'>
                <Table striped hover>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center align-middle' style={{ width: '4rem' }}>
                                ID
                            </th>
                            <th className='text-center align-middle'>Title</th>
                            <th className='text-end' style={{ width: '12rem' }}>
                                Completed&nbsp;
                                <Button onClick={() => handleShow()}>
                                    <i className='bi bi-plus'></i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.filter((todo, index) => {
                                return index >= (curPage - 1) * itemsPerPage
                                    &&
                                    index <= curPage * itemsPerPage - 1
                            })

                                .map((todo) => {
                                    return (
                                        <tr key={todo.id}>
                                            <td className='text-center'>
                                                <Badge bg='secondary'>{todo.id}</Badge>
                                            </td>
                                            <td className='text-start'>{todo.title}</td>
                                            <td className='text-end'>
                                                {todo.completed ? (
                                                    <Badge bg='success'>
                                                        done&nbsp;<i className='bi bi-check'></i>
                                                    </Badge>
                                                ) : (
                                                    <Button
                                                        variant='warning'
                                                        onClick={() => waitingClicked(todo.id)}>
                                                        waiting&nbsp;<i className='bi bi-clock'></i>
                                                    </Button>
                                                )}
                                                &nbsp;
                                                <Button
                                                    variant='danger'
                                                    onClick={() => deleteClicked(todo.id)}>
                                                    <i className='bi bi-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </Table>
            </div>
            {/* page control */}
            <div className='text-center mt-2'>
                <Button
                    variant='outline-dark '
                    onClick={() => setCurPage(1)}
                    disabled={curPage <= 1}
                    style={{ color: "gold" }}
                >
                    First
                </Button>
                &nbsp;
                <Button
                    variant='outline-dark '
                    onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
                    disabled={curPage <= 1}
                    style={{ color: "gold" }}
                >
                    Previous
                </Button>
                &nbsp;
                <span style={{ color: "gold" }}>
                    {curPage}&nbsp;/&nbsp;{numPages}
                </span>
                &nbsp;
                <Button
                    variant='outline-dark '
                    onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
                    disabled={curPage >= numPages}
                    style={{ color: "gold" }}
                >
                    Next
                </Button>
                &nbsp;
                <Button
                    variant='outline-dark '
                    onClick={() => {
                        setCurPage(numPages)
                    }}
                    disabled={curPage >= numPages}
                    style={{ color: "gold" }}
                >
                    Last
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Button
                            variant='primary'
                            className='m-1'
                            style={{ width: "40px", height: "40px" }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0d6efd")}
                        >
                            <i className='bi bi-plus'></i>
                        </Button>
                        Add Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Badge bg="secondary" style={{ marginLeft: "1rem" }}>
                                <Form.Control
                                    value={
                                        todosRaw.reduce((prev, todo) => {
                                            return todo.id > prev ? todo.id : prev;
                                        }, -1) + 1
                                    }
                                    autoFocus
                                    disabled
                                    ref={newIdRef}
                                    className="border-0 bg-transparent text-white p-0"
                                    style={{ width: "40px", textAlign: "center" }}
                                />
                            </Badge>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                placeholder="typing your todo title here..."
                                autoFocus
                                ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveClicke(Number(newIdRef.current.value), newTitleRef.current.value)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Todos