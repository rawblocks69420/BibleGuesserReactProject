export default function Header(props) {
    
    return (
        <div style={{width:"500px", textAlign:"center", backgroundColor:"#6D98BA", margin:"auto", padding:"20px", borderRadius:"20px"}}>
            <h1 style={{fontSize:"40px"}}>{props.words}</h1>
        </div>
    )
}
