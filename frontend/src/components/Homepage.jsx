import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Homepage(props) {

    //usestate variables
    const[nameSign,setNameSign] = useState("");
    const[emailLog,setEmailLog] = useState("");
    const[emailSign,setEmailSign] = useState("");
    const[passLog,setPassLog] = useState("");
    const[passSign,setPassSign] = useState("");
    const[err,setErr]=useState("");
    const navigate = useNavigate();

    //functions
    async function handleLog(){
        const aadmi = {email:emailLog,password:passLog};
        const response = await fetch("http://localhost:5000/Login",{
          method:"POST",
          body:JSON.stringify(aadmi),
          headers:{
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        if(!response.ok){
          // console.log(result)
          setPassLog("");
          setErr(result.error);
          setTimeout(()=>setErr(""),4000);
        }
        else{
          // console.log("post toh hua tha");
          setErr("");
          props.onLogin(result._id);
          navigate(`/Task-page`);
        }
    }
    async function handleSign(){
        const aadmi = {name:nameSign,email:emailSign,password:passSign};
        const response = await fetch("http://localhost:5000/Signup",{
          method:"POST",
          body:JSON.stringify(aadmi),
          headers:{
            "Content-Type": "application/json"
          }
        })
        const result = await response.json();
        if(!response.ok){
          // console.log(result)
          setPassSign("");
          if(result.error==="1100")
          {setErr("Email already exists use different mail");
          setTimeout(()=>setErr(""),4000);}
        }
        else{
          // console.log("post toh hua tha");
          setErr("");
          props.onLogin(result._id);
          navigate(`/Task-page`);
        }
    }

  return (<>

    <div>
      {err && <div class="alert alert-danger" role="alert">
  {err}
</div>
      }
      <h1 className='text-center' style={{marginTop:"5vh",fontStyle:"italic",textShadow:"0px 0px 5px black",color:"white"}}>"Welcome to Taskon - an app for all your tasks managment"</h1>
      <div className="main-entry">
        <div className="log-or-sign">
            <h3>Login</h3>
            <input type="email" placeholder='email' value={emailLog} onChange={(e)=>setEmailLog(e.target.value)}/>
            <input type="password" placeholder='password'value={passLog} onChange={(e)=>setPassLog(e.target.value)}/>
            <button className="log-or-sign-btn" onClick={handleLog}>Login</button>
        </div>
        <div className="log-or-sign">
            <h3>Sign Up</h3>
            <input type="text" placeholder='Name' value={nameSign} onChange={(e)=>{setNameSign(e.target.value)}}/>
            <input type="email" placeholder='email' value={emailSign} onChange={(e)=>{setEmailSign(e.target.value)}}/>
            <input type="password" placeholder='password'value={passSign} onChange={(e)=>{setPassSign(e.target.value)}}/>
            <button className="log-or-sign-btn" onClick={handleSign}>Sign Up</button>

        </div>
      </div>
    </div>
    </>)
}
