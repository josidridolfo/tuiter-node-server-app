const HelloController = (app) => {
app.get('/hello', (request, response) => {
        response.send('Life is good!')
})
app.get('/', (request, response) => {
    response.send('Welcome to Full Stack Developer')
})

}

export default HelloController