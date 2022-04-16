import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }: { allPostsData: { date: string, title: string, id: string }[] }) {
  return (
    <div className="w-screen h-screen flex">
      <nav className="flex flex-col bg-primary">
        <div className="grow text-2xl flex justify-center items-center text-secondary font-bold">IC</div>
        <ul className="grow-[5] list-none flex flex-col text-secondary text-sm">
          <li className="px-6 py-2 cursor-pointer hover:bg-secondary-transparent">Income</li>
          <li className="px-6 py-2 cursor-pointer hover:bg-secondary-transparent">Calculator</li>
        </ul>
      </nav>

      <section className="grow h-full">
        Main Content
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
