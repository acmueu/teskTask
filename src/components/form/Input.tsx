import React from 'react'
import styles from '../../styles/Form.module.css'

interface props{
  label?:string,
  type?:string,
  onChange?:(value?:any, )=>void,
  defaultValue?:string

  
}

export default function Input(props:props) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor='first' >{props.label}</label>
      <input onChange={(value)=>{props.onChange?.(value.target.value)}} defaultValue={props.defaultValue} type={props.type} className={styles.input} name={'first'} />
    </div>
  )
}
