import { useEffect, useState } from 'react'
import './App.scss'
import NavBar from './components/NavBar'
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import ToDoService from './services/ToDo.service'
import ToDo, { ToDoInput } from './interfaces/ToDo.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRotate, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';


function App() {

  const [toDos, setToDos] = useState<ToDo[]>([])

  const submitNewToDo = (todo: ToDoInput, { resetForm }: FormikHelpers<ToDoInput>) => {
    const service = new ToDoService()
    service.create(todo).then(td => {
      setToDos([...toDos, td])
      resetForm()
    })
  }

  const markAsTodo = (todo: ToDo) => {
    const service = new ToDoService()
    todo.status = 'todo'
    service.update(todo).then(todo => {
      setToDos(toDos.map(td => td.id === todo.id ? td : td))
    })
  }

  const markAsInProgress = (todo: ToDo) => {
    const service = new ToDoService()
    todo.status = 'in_progress'
    service.update(todo).then(todo => {
      setToDos(toDos.map(td => td.id === todo.id ? td : td))
    })
  }

  const markAsDone = (todo: ToDo) => {
    const service = new ToDoService()
    todo.status = 'done'
    service.update(todo).then(todo => {
      setToDos(toDos.map(td => td.id === todo.id ? td : td))
    })
  }

  const deleteToDo = (id: number) => {
    const service = new ToDoService()
    service.delete(id).then(() => {
      setToDos(toDos.filter(td => td.id !== id))
    })
  }


  useEffect(() => {
    const service = new ToDoService()
    service.list().then(tds => {
      setToDos(tds)
    })
  }, [])

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    status: yup.string().required(),
  });

  const formatStatus = (status: string) => {
    switch (status) {
      case 'todo':
        return 'Todo'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return ''
    }
  }

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row className='mt-4 justify-content-center'>
          <Col sm={12} md={6} lg={4} className='mb-3'>
            <Card className='w-100 create-todo-card'>
              <Card.Body>
                <Card.Title>Add a new task?</Card.Title>
                <Formik
                  validationSchema={schema}
                  onSubmit={submitNewToDo}
                  initialValues={{
                    title: '',
                    description: '',
                    status: 'todo'
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className='mb-2'>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-2"
                      >
                        <Form.Control
                        size="lg"
                          placeholder=""
                          type="text"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.title}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Description"
                        className="mb-2"
                      >
                        <Form.Control
                        size="sm"
                          placeholder=""
                          type="text"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelect" label="Status">
                        <Form.Select
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          isInvalid={!!errors.status}
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <Button type='submit' className="mt-2" variant="primary">Save</Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Card className='w-100' >
              <Card.Body>
                {toDos.map(td => (
                  <Card className='todo-card mb-2' bg={(() => {
                    switch (td.status) {
                      case 'todo':
                        return 'primary'
                      case 'in_progress':
                        return 'info'
                      case 'done':
                        return 'success'
                      default:
                        return 'secondary'
                    }
                  })()} key={td.id}>
                    <Card.Body>
                      <Row>
                        <Col sm={12} md={8} lg={8}>
                          <Card.Text className='my-0 fs-5'>{td.title}</Card.Text>
                          <div className='todo-description'>{formatStatus(td.status)} { td.description ? ' | ' + td.description : ''}</div>
                        </Col>
                        <Col sm={12} md={4} lg={4} className='d-flex justify-content-end m-0 p-0'>
                          <div>
                            {td.status !== 'done' &&
                              <Button variant="secondary" className='mx-1' onClick={() => markAsDone(td)}>
                                <FontAwesomeIcon icon={faCheck} />
                              </Button>}
                            {td.status !== 'todo' &&
                              <Button variant="secondary" className='mx-1' onClick={() => markAsTodo(td)}>
                                <FontAwesomeIcon icon={faCircle} />
                              </Button>}
                            {td.status !== 'in_progress' &&
                              <Button variant="secondary" className='mx-1' onClick={() => markAsInProgress(td)}>
                                <FontAwesomeIcon icon={faRotate} />
                              </Button>}
                            <Button variant="danger" className='mx-1' onClick={() => { deleteToDo(td.id) }}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>

                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
