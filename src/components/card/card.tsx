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
            <h3  className="title">{props.title}</h3>
            <p className="price"><b>Valor: $</b>{props.price}</p>
        </div>
    )
}