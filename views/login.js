import { createSSRApp } from 'vue'

export async function useLogin() {
    return createSSRApp({
        template: /*html*/`<header class="container">
                <a href="/register">Sign up</a>
            </header>
            <main class="container">
                <h1>Log in</h1>
                <form 
                    action="/login"
                    method="POST">
                    <div class="form-parent">
                        <div class="form-item">
                            <label for="username">Username</label>
                            <input type="text" 
                                inputmode="email" 
                                id="username" 
                                name="username" 
                                required 
                                minlength="3" 
                                maxlength="20" 
                                pattern="[A-Za-z0-9]+" 
                                title="Username must be 3-20 characters long and contain only letters and numbers." />
                        </div>
                        <div class="form-item">
                            <label for="password">Password</label>
                            <input type="password" 
                                id="password" 
                                name="password" 
                                required 
                                minlength="8" 
                                title="Password must be at least 8 characters long." />
                        </div>
                        <div class="form-item form-controls">
                            <button type="submit">Log in</button>
                        </div>
                    </div>
                </form>
            </main>`
    })
}