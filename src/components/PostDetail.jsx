import { Link } from "react-router-dom";
import CircleRating from "./CircleRating";
// import styles from "./PostDeatil.module.css"


const PostDetail = ({ post }) => {
    return (
        <div className="card" style={{ "width": "10rem;", "padding": "5px", "margin": "7px",  "box-shadow": "5px 4px 46px -8px rgba(255,255,255,1)"}}>
            <img src={post.image} class="card-img-top" alt="..." style={{maxHeight:"20rem",objectFit:"scale-down"}}/>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p style={{color:"gray"}} class="card-text">{post.body}</p>
                <p className="card-text">Categoria:<span style={{ color: "green" }}>{post.category}</span></p>
            </div>
            <ul className="list-group list-group-flush">
                <li style={{display:"flex",alignItems:"center"}}  className="list-group-item"><span style={{ fontWeight: 900 }}>Nota</span>:<span style={{display:"inline-block"}} >
                <CircleRating  rating={post.note} />
                </span></li>
            </ul>
            <div className="card-body">
                {/* <a href="#" class="card-link">Card link</a> */}
                <Link to={`/posts/${post.id}`} className="btn btn-primary">Abrir</Link>
            </div>
        </div>
    )
}

export default PostDetail;