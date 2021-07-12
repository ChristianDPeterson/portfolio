import Head from "next/head";
import Link from "next/link";
import Prismic from "prismic-javascript";

import Header from "../components/Header/Header";
import Links from "../components/Links/Links";
import PostPreview from "../components/PostPreview/PostPreview";

import { client } from "../prismic-configuration";

export default function Home({ posts }) {
	console.log(posts);
	return (
		<div className="container">
			<Head>
				<title>Christian Peterson</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header></Header>
			<Links></Links>
			<h2>bio</h2>
			<p className="bio">
				I'm a student at the University of Arizona, majoring in Computer
				Science with a minor in Music. In my freetime, I make music,
				read, play video games, and bike. Join me on my journey!
			</p>
			<h2>blog</h2>
			<div className="card-container">
				{posts &&
					posts.map((post, i) => (
						<PostPreview
							key={post.uid}
							title={post.data.title[0].text}
							href={`/posts/${post.uid}`}
							preview={post.data.description}
							date={post.data.date}
						></PostPreview>
					))}
			</div>
			<Link href="/posts">See all posts</Link>
		</div>
	);
}

export async function getStaticProps() {
	const posts = await client.query(
		Prismic.Predicates.at("document.type", "post"),
		{ orderings: "[my.post.date desc]", pageSize: 4 }
	);
	return {
		props: {
			posts: posts.results,
		},
	};
}
