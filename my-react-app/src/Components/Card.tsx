interface ICard {
    name: string
    age?: number
    children?: React.ReactNode
}

const Card = ({
    name,
    age,
    children
}: ICard) => {
    return(
        <div>
            <h1>Candidate</h1>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            {
                children
            }
        </div>
    )
}

export default Card