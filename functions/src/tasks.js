// app.get('/tasks', getTask)
// app.post('/tasks', postTask)
// app.patch('/tasks/:taskId', updateTask)
// app.delete('/tasks/:taskId', deleteTask)

import dbConnect from "./dbConnect.js";



export function getTasks(req, res) { //later add 'by user id' to this..
    const db = dbConnect();
    const collection = await db.collection('tasks').get()     
            .catch(err => res.status(500).send(err));
    const tasks = collection.docs.map(doc => {
        //return {...doc.data(), id:doc.id}
        let task = doc.data();
        task.id = doc.id
        return task;
    })
    res.send('TASK');
}

export async function createTask(req, res) {//later we will add userId and timestamp...
    const newTask = req.body;
    if (!newTask || !newTask.task) {
        res.status(400)({ success: false, message: 'Invalid request'})
        return;
    }
    const db = dbConnect();
    await db.collection('tasks').add(newTask)
    .catch(err => res.status(500).send(err))
    res.status(201)
    getTasks(req, res) // send back the full list of tasks...
}

export function updateTask(req, res) { 
    const taskUpdate = req.body;
    const { taskId } = req.params;
    res.status(202).send('Task Updated')
}

export function deleteTask(req, res) {
    const { taskId } = req.params;
    res.status(203).send('Task Deleted')
}