import React from 'react'
import styles from './clover.module.scss'
export default function index() {
    return (
        <div className={``}>
            Hello
            <div className={styles.world}>
                world
            </div>
        </div>
    )
}