export const Favorite = ({user, apodo, noCuenta})=>{ //PROPS -> parámetros que se envían al momento de llamar al componente (la función)
    return (
        <>
            <td>{user}</td>
            <td>{apodo}</td>
            <td>{noCuenta}</td>
        </>
    )
}