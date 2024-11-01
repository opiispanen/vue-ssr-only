import express from 'express'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { renderToString } from 'vue/server-renderer'
import { defaultView } from './common/viewTemplate.js'
import { useFrontpage } from './views/frontpage.js'
import { 
	useEditTodo, 
	useSaveTodo,
	useUpdateTodo,
	useDeleteTodo
} from './views/editTodo.js'

const server = express()
const port = 3150

server.disable('x-powered-by')
server.use(compression())
server.use(cookieParser())
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
}))

server.get('/', async (req, res) => {
	const { search } = req.query
	const view = await useFrontpage(search)
	const html = await renderToString(view)

	res.send(defaultView(html))
})

server.get('/create', async (req, res) => {
	const view = await useEditTodo()
	const html = await renderToString(view)

	res.send(defaultView(html))
})

server.get('/edit/:todoId', async (req, res) => {
	const { todoId } = req.params
	const view = await useEditTodo(todoId)
	const html = await renderToString(view)

	res.send(defaultView(html))
})

server.post('/create', useSaveTodo)

server.post('/update', useUpdateTodo)

server.post('/delete', useDeleteTodo)

server.listen(port, () => {
    console.log('Server started', `http://localhost:${port}`);
})