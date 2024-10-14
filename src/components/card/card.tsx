import "./card.css"
    
interface CardProps {
    price: number,
    title: string,
    image: string
}

export function Card(props : CardProps){
    return(
        <div className="card">
            <img src={props.image} alt={props.title}></img>
            <h2>{props.title}</h2>
            <p><b>Valor: </b>{props.price}</p>
        </div>
    )
}