export const User = ({ DPI,noCuenta, name, surname, email, balance }) => {
    return (
        <>
            <td>{DPI}</td>
            <td>{noCuenta}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{email}</td>
            <td>{balance}</td>
        </>
    )
}