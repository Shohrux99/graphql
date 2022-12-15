import Image from 'next/image'
import styles from './style.module.scss'
import useTranslation from 'next-translate/useTranslation'
import {Container} from '@mui/material'
import Button from '@mui/material/Button';
import {createPost, getPosts} from 'services'
import {useEffect, useState} from 'react'
import {Counter} from '../Counter/Counter'
import classNames from 'classnames'
import {GraphQLClient} from "graphql-request";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from "next/link";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function Main({posts}) {
    console.log('sssss', posts)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <section className={styles.wrapper}>
            <Container>
                <div className={styles.main}>
                    {
                        posts.map((post) => (
                            <Card sx={{maxWidth: 345}} key={post.id}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                            <img src={post.author.avatar.url} alt=""/>
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={post.author.name}
                                    subheader={post.datePublished}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={post.coverPhoto.url}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <p dangerouslySetInnerHTML={{__html: post.content.html}} className={styles.content}/>
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon/>
                                    </IconButton>
                                    <CardActions>
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button size="small">Learn More</Button>
                                        </Link>
                                    </CardActions>
                                </CardActions>
                            </Card>
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}
