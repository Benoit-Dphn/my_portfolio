'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const posts: {title: string; body: string; id: number}[] = []
let nextId = 1

export async function getPosts() {
    return posts
}

export async function getPost(id: number) {
    return posts.find((p) => p.id === id) ?? null
}

export async function createPost(form: FormData) {
    posts.push({
        title: String(form.get('title')),
        body: String(form.get('body')),
        id: nextId++,
    })
    redirect((await headers()).get('referer')??'/')
}

export async function editPost(form: FormData) {
    const id = Number(form.get('id'))
    const post = posts.find((p) => p.id === id)

    if(post){
        post.title=String(form.get('title'))
        post.body=String(form.get('body'))
    }
    redirect((await headers()).get('referer')??'/')
}

export async function deletePost(id: number) {
    const index = posts.findIndex((p) => p.id === id)

    if (index !== -1) {
        posts.splice(index, 1)
    }
    redirect((await headers()).get('referer')??'/')
}