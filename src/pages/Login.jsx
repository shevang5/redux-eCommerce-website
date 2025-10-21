import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { asyncLoginUsers } from '../store/action/userActions'
import { nanoid } from 'nanoid'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
    const dispatch = useDispatch()
  const onSubmit = (data) => {
    data.id = nanoid()
    dispatch(asyncLoginUsers(data))
    console.log(data)
    navigate('/home')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-8 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-6">Login</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input type="email" id="email" required {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input type="password" required id="password" {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      
    </div>
    <Link to="/register" >dont have an account ? register</Link>
  </form>
</div>
  )
}

export default Login
