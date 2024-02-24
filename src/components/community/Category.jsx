/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../../styles/community/category.module.css';

export default function Category({ category, callback, selected }) {
  return (
    <div 
      className={`${styles.cat} ${selected === category.id ? styles.selected: styles.none}`}
      onClick={() => {
        callback(category);
      }}>
        <p>
          {category.name}
        </p>
    </div>
    // <li
    //   className={selected === category.id ? styles.selected: styles.none}
    //   onClick={() => {
    //     callback(category);
    //   }}>
    //   {category.name}
    // </li>
  );
}
