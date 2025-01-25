import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import { renderToString } from 'vue/server-renderer'
import { defaultView } from './common/viewTemplate.js'
import { useFrontpage } from './views/frontpage.js'
import { useLogin } from './views/login.js'
import { useRegister } from './views/register.js'
import { 
	useEditTodo, 
	useSaveTodo,
	useUpdateTodo,
	useDeleteTodo
} from './views/editTodo.js'
import {
	authenticate,
	registerUser,
	loginUser,
    logoutUser,
} from 'viixet-authn'

const server = express()
const port = 3150

server.disable('x-powered-by')
server.use(compression())
server.use(cookieParser())
server.use(bodyParser.json({ limit: '50mb' }))
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
}))

const authenticationMiddleware = async (req, res, next) => {
    const publicRoutes = ['/login', '/register']

    if (publicRoutes.includes(req.path)) {
        return next()
    }

    const sessionId = req.cookies?.session_id
	
    if (!sessionId) {
        return res.redirect('/login');
    }

    try {
        const user = await authenticate(sessionId)
        req.user = user
        next()
    } catch (e) {
        console.log(e.stack)
        return res.redirect('/login')
    }
}

server.use(authenticationMiddleware)

server.get('/register', async (req, res) => {
	const view = await useRegister()
	const html = await renderToString(view)

	res.send(defaultView(html))
})

server.post('/register', async (req, res) => {
    const {
        'username-account': username,
        'password-account': password,
        'password-confirmation': passwordConfirmation,
        'email-account': email
    } = req.body

    // Validate required fields
    if (!username || !email) {
        return res.redirect('/register?error=missing_fields');
    }

    // Validate password matching
    if (password !== passwordConfirmation) {
        return res.redirect('/register?error=password_mismatch');
    }

    try {
        const userId = await registerUser(username, password, email);

        if (userId) {
            return res.redirect('/login');
        }

        return res.redirect(`/register?error=registration_failed`);
    } catch (error) {
        console.log('Error during registration:', error);
        return res.redirect('/register?error=server_error');
    }
})

server.get('/login', async (req, res) => {
	const view = await useLogin()
	const html = await renderToString(view)

	res.send(defaultView(html))
})

server.post('/logout', async (req, res) => {
    try {
        const sessionId = req.cookies?.session_id

        if (sessionId) {
            const success = await logoutUser(sessionId)

            if (success) {
                res.clearCookie('session_id', {
                    httpOnly: true,
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
                    sameSite: 'lax',
                })
            } else {
                console.log('Error during logout: logout failed', sessionId)
            }
        } else {
            console.log('Error during logout: no session ID found')
        }
    } catch (error) {
        console.log('Error during logout:', error)
    }

    return res.redirect('/login')
})

server.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const { session_id } = await loginUser(username, password);
		
        if (session_id) {
			// 1 week
			const maxAge = 7 * 24 * 60 * 60 * 1000
            const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
            res.cookie('session_id', session_id, {
                httpOnly: true,
                secure: isSecure,
                maxAge,
                sameSite: 'lax',
            })

            return res.redirect('/');
        }

        return res.redirect('/login?error=login_failed');
    } catch (error) {
        console.log('Error during login:', error);
        return res.redirect('/login?error=server_error');
    }
})

server.get('/', async (req, res) => {
	const { search } = req.query
	const view = await useFrontpage(req.user, search)
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