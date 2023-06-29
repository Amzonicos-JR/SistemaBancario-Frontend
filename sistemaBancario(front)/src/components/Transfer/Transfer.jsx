export const Transfer = ({ DPIO, DPIB, accountNo, amount, date }) => {
    return (
        <>
            <td>{DPIO}</td>
            <td>{DPIB}</td>
            <td>{accountNo}</td>
            <td>{amount}</td>
            <td>{date}</td>
        </>
    )
}