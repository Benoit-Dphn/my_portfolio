import { editPost, deletePost, getPost } from "@/lib/blog";
export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) return <p>Post introuvable</p>;

  return (
    <>
      <ul>
        <form action={editPost}>
          <input type="hidden" name="id" value={post.id} />
          <input name="title" defaultValue={post.title} />
          <textarea name="body" defaultValue={post.body} />
          <button type="submit">Enregistrer</button>
        </form>
      </ul>
      <ul>
        <form action={deletePost.bind(null, post.id)}>
          <button type="submit">Supprimer</button>
        </form>
      </ul>
    </>
  );
}
