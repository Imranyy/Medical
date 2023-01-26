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
    ])
    //
    const [goal,setGoal]=useState('');
    const text=`  Our objective is ensuring healthy living and protect sick people from developing diseases. Your feedback will help our model learn.`
    var curr=0
    useEffect(()=>{
      if(curr<text.length){
        setInterval(()=>{
          setGoal((value)=>value+text.charAt(curr))
          curr++
        },50)
      }
    },[])
    
    const start=()=>{
      setGoal('');
      setStartInfo([]);
      document.querySelector('.new-check-up').classList.add('checked')

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
                    <li className='clear-screen'><i className="fa fa-trash add"></i> Delete Chats</li>
                </ul>
            </div>
        </div>
        <div className={styles.window}>
            <small>{goal}</small><br/>
            <div className={styles.startInfo}>
              {startInfo.map(i=>(
                <div className={styles.tab} key={i.id}>
                  <p><i className={i.icon} style={{marginRight:"5px"}}></i> {i.name}.</p>
                </div>
              ))}
            </div>

            <div className="text-response"></div>
            <div className="down"></div>
            <form className="handle-submit">
              <input className="playground-textarea" name='request' placeholder="Signs or symptoms" required/>
              <button className="playground-submit-btn"></button>
            </form>
        </div>
      </div>
    </div>
  )
}
