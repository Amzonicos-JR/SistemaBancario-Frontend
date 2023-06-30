export const Loan = ({ DPI, noCuenta, amount, interestRate, durationMonths, monthlyFee, totalPay}) => {
    return(
        <>
            <td>{DPI}</td>
            <td>{noCuenta}</td>
            <td>{amount}</td>
            <td>{interestRate}</td>
            <td>{durationMonths}</td>
            <td>{monthlyFee}</td>
            <td>{totalPay}</td>
        </>
    )
}