import { React, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios'

const SimpleBarCharts = () => {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/user/getAccounts')
      if (data.users) {
        setUsers(data.users)        
      }
    } catch (err) {      
      console.log(err);
      throw new Error(err.response.message || data, "Error getting users");
    }

  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <br /> <br />
      <h1 className='text-center'> Stats for Users</h1>
      <br />      
      {
        users.map(({ _id, DPI, noCuenta, name, surname, email, balance }, index) => {})
      }

      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart
          data={users}
          width={500}
          height={300}
          margin={
            {
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
        >
          <CartesianGrid strokeDasharray='4 1 2' />
          <XAxis dataKey='name' />
          <YAxis />
          <Legend />
          <Bar dataKey='movimientos' fill='#6b48ff' />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default SimpleBarCharts
