'use client';
import React from 'react'
import { Card } from '../../utils/types';
import styles from '../../styles/UI.module.css';

function Card(props: Card) {
    return (
       <div className={`${props?.className} ${styles.card}`}>
        {props.children}
       </div>
    )
}

export default Card;
