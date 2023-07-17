import { React, useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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
        users.map(({ _id, DPI, noCuenta, name, surname, email, balance }, index) => { })
      }
      <div className='text-center'>
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart
            width={500}
            height={400}
            data={users}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="movimientos" stackId="1" stroke='#8884d8' fill="#A3F3CF" />
            <Area type="monotone" dataKey="balance" stackId="1" stroke='#8884d8' fill="#A3F3CF" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default SimpleBarCharts