import React from 'react';
import { Button } from '../../utils/types';
import styles from '../../styles/UI.module.css';

function Button(props: Button) {
    return (
        <div>
            <button
                onClick={props?.onClick}
                className={`${props?.className} ${styles.button}`}
                disabled={props?.disabled}
                type={props?.type || "button"}
            >
                {props.children}
            </button>
        </div>
    )
}

export default Button;
