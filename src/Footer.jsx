import React from 'react';
import {Link} from 'react-router';

import footerStyles from '../styles/footer.css';

export default function({index}) {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles['in-touch']}>
        <ul>
          <li><a href="https://twitter.com/"><img src="/images/twitter-logo.svg" /> @SAMPLE</a></li>
          <li><a href="mailto:TEST@TEST.COM"><img src="/images/mail-icon.svg" /> TEST@TEST.COM</a></li>
          <li><a href="https://github.com/"><img src="/images/github-logo.svg" /> GITHUB</a></li>
        </ul>
      </div>
    </footer>
  )
}
