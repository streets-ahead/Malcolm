import React from 'react';
import dateFormat from 'dateformat';

import styles from '../../styles/post.css';

export default function({content}) {
  const {body, title, published, author, tags, subHead} = content;
  
  return (
    <div className={styles['post']}>
      <div className={styles['header']}>
        <div className={styles['spacer']}></div>
        <div className={styles['header-content']}>
          <ul className={styles['tags-box']}>
            {tags.map(d => <li key={d}>{d}</li>)}
          </ul>
          <h1>{title}</h1>
          <p className={styles['subhead']}>{subHead}</p>
          <p className={styles['date']}>
            {dateFormat(new Date(published), "mmm dd, yyyy")} / {author}
          </p>
        </div>
      </div>
      <div className={styles['post-container']}>
        <div className={styles['post-body']} dangerouslySetInnerHTML={{__html: body}} /> 
      </div>
    </div>
  );
}
