import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }: { allPostsData: { date: string, title: string, id: string }[] }) {
  return (
    <div>
      Dashboard
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
