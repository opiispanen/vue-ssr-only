import fs from 'fs'

export function defaultView(html) {
	let styles = ''

	try {  
		styles = fs.readFileSync('styles/main.css');
	} catch(e) {
		console.log('error loading styles', e)
	}
	return /*html*/`<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Vue SSR Todo</title>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.slate.min.css"
				/>
			<link 
				rel="stylesheet" 
				href="https://cdn.jsdelivr.net/npm/flexboxgrid@6.3.1/dist/flexboxgrid.min.css"
				/>
		</head>
		<body>
			${ html }
		<style>
			${ styles }
		</body>
	</html>`
}