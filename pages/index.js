import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../estilos/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData} from '../lib/posts'

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Olá, este é meu primeiro app feito com Next.js. Confira meu <Link href="https://github.com/ascdevs"><a target="_blank" ref="noopener noreferrer+">github</a></Link> para encontrar mais aplicações.
        </p>
        <p><Link href="posts/first-post"><a>- First Post</a></Link></p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br/>
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData =  getSortedPostsData()
  return{
    props: {
      allPostsData
    }
  }
}
