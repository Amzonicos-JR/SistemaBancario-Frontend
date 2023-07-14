export const Favorite = ({ apodo, DPI, noCuenta})=>{ //PROPS -> parámetros que se envían al momento de llamar al componente (la función)
    return (
        <>
            <td>{apodo}</td>
            <td>{DPI}</td>
            <td>{noCuenta}</td>
        </>
    )
}