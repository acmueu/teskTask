import React from 'react'
import styles from '../../styles/Form.module.css'

interface props{
    title?:string
    onClick:()=>void
}

export default function Button(props:props) {
  return (
    <div
    onCopy={(e)=>{e.preventDefault()}}
    className={styles.addButton}
    onClick={()=>{
        props.onClick()
    }}
    >
    {props.title}
  </div>
  )
}
