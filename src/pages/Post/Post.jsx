
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from "./Post.module.css"
import { useDeleteDocument } from "../../hooks/useDeletDocuement";

const Post = () => {

    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)
    const navigate = useNavigate()
    const { deleteDocument } = useDeleteDocument("posts")

    function del(id){
    
        deleteDocument(id)
        return navigate('/')
    }

   // const {deleteDocument} = useDeleteDocument("posts")

    return (
        <div className={styles.post_container}>
            {post && <>
                <h1>{post.title}</h1>
                <img src={post.image} alt="" />
                <p>{post.body}</p>
                <p>Categoria:{post.category}</p>
                <div>
                <h3 style={{display:"inline-block"}}>Nota: {post.note}</h3>
                </div>
                <button className="btn btn-outline btn-danger" onClick={() => del(id)}>Excluir</button>
               <Link to={`/posts/edit/${id}`}> <button className="btn btn-outline">Editar</button></Link>
            </>}
        </div>
    )
}

export default Post;