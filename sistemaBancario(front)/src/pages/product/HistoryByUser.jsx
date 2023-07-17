import axios from "axios";
import React, { useEffect, useState } from "react";

export const HistoryByUser = () => {
  const [history, setHistory] = useState([{}]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const getHistory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/product/gethistory",
        { headers: headers }
      );
      if (data) {
        setHistory(data.history);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err.response.message || "Error to getting history");
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <h1 className="text-center">My History</h1>
      <div className="container accordion" id="accordionPanelsStayOpenExample">
        {history.slice(0, 10).map(({ _id, DPIO, DPIB, accountNo, amount, date, DPI, noCuenta, interestRate, durationMonths, monthlyFee, totalPay, color, type }, i) => {
        return (
          <>
            <div
              className="accordion-item"
              style={{ backgroundColor: `${color}` }}
            >
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#panelsStayOpen-collapse${i}`}
                  aria-expanded="true"
                  aria-controls={`panelsStayOpen-collapse${i}`}
                >
                  {type}
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapse${i}`}
                className="accordion-collapse collapse show"
              >
                {type == "Transfer" ? (
                  <>
                    <div className="card-body">
                      <h5 className="card-title">DPI Ordenante: {DPIO}</h5>
                      <h5 className="card-title">DPI Beneficiario: {DPIB} </h5>
                      <h5 className="card-title">AccountNo: {accountNo} </h5>
                      <h5 className="card-title">Date: {date} </h5>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Amount: Q, {amount} </h5>
                    </div>
                  </>
                ) : type == "Deposit" ? (
                  <>
                    <div className="card-body">
                      <h5 className="card-title">DPI Ordenante: {DPIO} </h5>
                      <h5 className="card-title">DPI Beneficiario: {DPIB} </h5>
                      <h5 className="card-title">AccountNo: {accountNo}</h5>
                      <h5 className="card-title">Date: {date} </h5>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Amount: Q. {amount} </h5>
                    </div>
                  </>
                ) : type === "Loan" ? (
                  <>
                    <div className="card-body">
                      <h5 className="card-title">DPI: {DPI} </h5>
                      <h5 className="card-title">NoCuenta: {noCuenta} </h5>
                      <h5 className="card-title">Amount: {amount} </h5>
                      <h5 className="card-title">InterestRate: {interestRate} </h5>
                      <h5 className="card-title">DurationMonths: {durationMonths} </h5>
                      <h5 className="card-title">MonthlyFee: {monthlyFee} </h5>
                      <h5 className="card-title">Date: {date} </h5>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">TotalPay: Q. {totalPay} </h5>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="accordion-body"></div>
              </div>
            </div>
          </>
        )})}
      </div>
    </>
  );
};
