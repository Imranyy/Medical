import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [startInfo,setStartInfo]=useState([
      {
          id:1,
          icon:"fa fa-bolt",
          name:"Powered By Artificial Intelligence."
      },
      {
          id:2,
          icon:`fa fa-comment`,
          name:"Your Medical assistant."
      },
      {
          id:3,
          icon:`fa fa-user`,
          name:"Improve your health."
      }
    ]);

    const goal='Our objective is ensuring healthy living and protect sick people from developing diseases. Your feedback will help our model learn.'
    var curr=0;
    const write=()=>{
        const text=document.querySelector('.small-first-text');
        text.textContent+=goal.charAt(curr);
        curr++;
        if(curr<goal.length){
            setTimeout(write,100)
        }
    }
    const goal1='ensuring healthy living and protect sick people from developing diseases..'
    var curr1=0;
    const write1=()=>{
        const text=document.querySelector('.small-first');
        text.textContent+=goal1.charAt(curr1);
        curr1++;
        if(curr1<goal1.length){
            setTimeout(write1,100)
        }
    }
    useEffect(()=>{
      write();
      setTimeout(()=>{
        write1()
      },5000)
    },[])
    
    const start=()=>{
      setStartInfo([]);
      document.querySelector('.small-first-text').textContent=''
      document.querySelector('.new-check-up').classList.add('checked')
      document.querySelector('form').style.opacity=1;
    }

    const [input,setInput]=useState('');
    const [data,setData]=useState([]);
    const [aiResponse,setAiResponse]=useState([]);
    const [btnIcon,setBtnIcon]=useState(<i className="fa fa-send"></i>);
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const form=document.querySelector('form');
      try {
        setBtnIcon(<i className="fa fa-rocket"></i>)
        const url='/api/'
        const response=await fetch(url,{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({
              prompt:input
          })
        })
        setBtnIcon(<i className="fa fa-send"></i>)
        form.reset()
        const parseRes=await response.json();
        if(parseRes.error){
          setData(
            <div className={styles.textError}>
              <p style={{color:'red'}}>Error: {parseRes.msg}</p>
            </div>
          )
          setTimeout(()=>{
            setData('')
          },8000)
        }else{
          setAiResponse(parseRes.mess)
          setData(parseRes.output);
          
        var curr=0;
        const hey=data.organic[0].title
        const hy=document.querySelector('.hey')
            hy.textContent+=hey.charAt(curr);
            curr++;
            if(curr<hey.length){
                setTimeout(write,50)
            }
        
        }
      } catch (error) {
        console.log(error.message)
        form.reset()
        setBtnIcon(<i className="fa fa-send"></i>)
        setData(
          <div className={styles.textError}>
            <p style={{color:'red'}}>Error: No Internet</p>
          </div>
        )
        setTimeout(()=>{
          setData('')
        },8000)
      }
    }

    const clearScreen=()=>{
      setTextResponse('')
    }
  return (
    <div>
      <Head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <meta name="description" content="Get quick medical Assistance by our AI powered api." />
        <title>Medical Assistant | playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* the body */}
      
      <div className={styles.playground}>
        <div className={styles.side}>
            <ul>
                <li className='new-check-up' onClick={start}><a href="#2"><span className={styles.add}>+</span>  Get Started</a></li>
            </ul>
            <div className={styles.info}>
                <ul>
                    <li onClick={clearScreen}><i className="fa fa-trash add"></i> Delete Chats</li>
                </ul>
            </div>
        </div>
        <div className={styles.window}>
            <small className='small-first-text'></small><br/>
            <small className='small-first'></small><br/>
            <div className={styles.startInfo}>
              {startInfo.map(i=>(
                <div className={styles.tab} key={i.id}>
                  <p><i className={i.icon} style={{marginRight:"5px"}}></i> {i.name}.</p>
                </div>
              ))}
            </div>

            <div className={styles.textResponse}>
            <p className={styles.req}> {input}  <small> <i>AI's response: {aiResponse}</i></small></p>
            <div className={styles.text} title={`${input} 's response`}>
                  <div key={data.organic&&data.organic[0].position}>
                        <p className='hey'></p>
                        {/* <p>{data.organic&&data.organic[0].snippet}</p>
                        <a href={data.organic&&data.organic[0].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <br/> */}
            </div>
                    {/* <div key={data.organic&&data.organic[1].position}>
                        <p>{data.organic&&data.organic[1].title}</p>
                        <p>{data.organic&&data.organic[1].snippet}</p>
                        <a href={data.organic&&data.organic[1].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <br/>
                    </div>
                    <div key={data.organic&&data.organic[2].position}>
                        <p>{data.organic&&data.organic[2].title}</p>
                        <p>{data.organic&&data.organic[2].snippet}</p>
                        <a href={data.organic&&data.organic[2].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <br/>
                    </div>
                    <div key={data.organic&&data.organic[3].position}>
                        <p>{data.organic&&data.organic[3].title}</p>
                        <p>{data.organic&&data.organic[3].snippet}</p>
                        <a href={data.organic&&data.organic[3].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <br/>
                    </div> */}
                </div>
            </div>
            <div className="down"></div>
            <form className="handle-submit" onSubmit={handleSubmit}>
              <input className="playground-textarea" onChange={e=>setInput(e.target.value)}  placeholder="Signs or symptoms" required/>
              <button className="playground-submit-btn">{btnIcon}</button>
            </form>
        </div>
      </div>
    </div>
  )
}
