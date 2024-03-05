import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Taskpage(props) {
    const [propId, setpropId] = useState(props.identify);
    const [username, setUserName] = useState();
    const [useremail, setUserEmail] = useState();
    const [usertasks, setUserTasks] = useState([]);
    const [taskcount, setTaskcount] = useState(0);
    const [newtaskname, setNewtaskname] = useState("")
    // const [l,setL]=useState(0);
    const checking = false;
    useEffect(() => {
        idstore();

    }, [])
    const idstore = () => {
        console.log("bhai id ka hu mai toh");
        if (props.identify) {
            localStorage.setItem('clientId', props.identify);
            userdata(props.identify);
        }
        else {
            setpropId(localStorage.getItem('clientId'));
            userdata(localStorage.getItem('clientId'));

        }
    }
    //to handle fetching of user data
    const userdata = async (id) => {
        console.log("fetch uppar ka hu")

        try {
            const response = await fetch(`http://localhost:5000/${id}`, {
                method: "GET"
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(result);
            }
            else {
                console.log("fetch update ka hu")

                setUserName(result[0].name);
                setUserEmail(result[0].email);
                setUserTasks(result[0].tasks);
                handlemap(result[0].tasks);

            }
        }
        catch (error) {
            console.log(error);
        }
    }
    //to count map count values
    const handlemap = (usersks) => {
        let a = usersks.filter((task) => !task.taskstatus).length;
        setTaskcount(a)
        console.log("handle map ka hu",taskcount)
    }
    //to add new task
    const newtask = async () => {
        if (newtaskname.trim(' ')) {
            const updata = { taskname: newtaskname, taskstatus: checking };
            const response = await fetch(`http://localhost:5000/newtask/${localStorage.getItem('clientId')}`, {
                method: "POST",
                body: JSON.stringify(updata),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json();
            if (!response.ok) {
                console.log(result)
            }
            else {
                console.log("kaam pura hua");
                setNewtaskname("")
                userdata(localStorage.getItem('clientId'));

            }
        }
        else {
            return
        }

    }

    //                                          For deleting task
    function deletask(taskid) {
        try {
            fetch(`http://localhost:5000/delete/${propId}/${taskid}`, {
                method: "DELETE",
                headers: {
                    "Content_type": "application/json"
                }
            });
            console.log("task ka saman gaya")
            userdata(localStorage.getItem('clientId'));
        }
        catch (error) {
            console.log(error);
        }
    }
    //
    // function checktoggle(taskId){
    //     var checkbox = document.getElementById(taskId);
    //     if(checkbox.checked){
    //         checkbox.checked=false;
    //     }
    //     else{
    //         checkbox.checked=true;
    //     }
    const checktoggle = async(taskId) => {
        // Assuming usertasks is an array of tasks and taskstatus is a boolean property
        const updatedTasks = usertasks.map((task) => {
          if (task._id === taskId) {
            // Toggle the taskstatus
            if(!task.taskstatus){
                setTaskcount((prevCount)=>prevCount-1);
                upstbc(taskId,true);
                console.log("if");
            }
            else{
                setTaskcount((prevCount)=>prevCount+1);
                upstbc(taskId,false);
                console.log("else")

            }
            return { ...task, taskstatus: !task.taskstatus };
          }
          return task;
        })
        setUserTasks(updatedTasks);
    }
    const upstbc=async(tid,newst)=>{
        console.log("upbst hu",typeof newst)
        const tt = {newstatus:`${newst}`}
        try{
        await fetch(`http://localhost:5000/status/${localStorage.getItem('clientId')}/${tid}`,{
            method:"PATCH",
            body:JSON.stringify(tt),
            headers:{
                "Content-Type":"application/json"
            }
        })}
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className='papaji'>
            <h1 className='text-center text-head'>{`Welcome to Taskon - an app for all your tasks managment`}</h1>
            <div className="user-card">
                <div className="user-card-data">Name: {username}</div>
                <div className="user-card-data">Email: {useremail}</div>
            </div>
            <div className="input-task-area">
                <input type="text" value={newtaskname} onChange={(e) => setNewtaskname(e.target.value)} placeholder='New task' />
                <button onClick={newtask}>Add Task</button></div>
            {<div className="taskcounter text-center">Tasks remaining : {taskcount}</div>}
            <div className="tasks">
                {usertasks?.map((ele) => (
                    <div key={ele._id} className="task">
                        <input type="checkbox" checked={ele.taskstatus} onClick={()=>checktoggle(ele._id)} id={ele._id}/>
                        <div className='taskname-div'>{ele.taskname}</div>
                        <button className="task-delete" onClick={() => deletask(ele._id)}>Delete</button>
                    </div>

                ))}
            </div>
        </div>
    )
}
