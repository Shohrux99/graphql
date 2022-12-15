import { Container } from '@mui/material'
import SEO from 'components/SEO'
import styles from "../../styles/blog.module.scss";
import {gql, GraphQLClient} from "graphql-request";

const graphcms = new GraphQLClient(
    "https://api-eu-west-2.graphcms.com/v2/cl21zpqgk4oep01xtflkm1vff/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
    const { posts } = await graphcms.request(SLUGLIST);
    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const data = await graphcms.request(QUERY, { slug });
    const post = data.post;
    return {
        props: {
            post,
        },
        revalidate: 30,
    };
}

export default function BlogId({ post }) {
  return (
    <>
        <main className={styles.blog}>
            <img
                className={styles.cover}
                src={post.coverPhoto.url}
                alt={post.title}
            />
            <div className={styles.title}>
                <div className={styles.authdetails}>
                    <img src={post.author.avatar.url} alt={post.author.name} />
                    <div className={styles.authtext}>
                        <h6>By {post.author.name} </h6>
                    </div>
                </div>
                <h2>{post.title}</h2>
            </div>
        </main>
    </>
  )
}
