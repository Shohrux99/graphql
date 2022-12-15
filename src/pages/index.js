import { Main } from 'components/UI/Main/Main'
import SEO from 'components/SEO'
import { fetchMultipleUrls } from 'services/fetchMultipleUrls'
import {gql, GraphQLClient} from "graphql-request";

export default function Home({ posts }) {

  return (
    <>
      <SEO />
      <Main posts={posts}/>
    </>
  )
}

const graphcms = new GraphQLClient(
    "https://api-eu-west-2.graphcms.com/v2/cl21zpqgk4oep01xtflkm1vff/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}