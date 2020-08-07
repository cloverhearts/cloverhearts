import React from 'react'
import Clover from '../components/clover'
import Link from 'next/link'
export default function index() {
  return (
    <article>
      <header>Hello CloverHearts web page</header>
      <p>
        <div className={`hello`}>
          <div className={`world`}>Hello world</div>
        </div>
        Nice body context
        <button>버튼</button>
        <Clover />
        <Link href="/about">
          <a>Index</a>
        </Link>
      </p>
    </article>
  )
}
