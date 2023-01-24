import { useState } from "react";
import axios from 'axios'
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { dispatch } = useAuthContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:4001/user/login', {
      email: email,
      password: password
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        dispatch({ type: 'LOGIN', payload: res.data })
        navigate('/')
      }
    }).catch(error => {
      console.log(error)
      if (error.response.status === 404) {
        setError(error.response.data['message'])
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-md">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    {error && <span className="text-danger">{error}</span>}
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-user"
                          placeholder="Enter Email Address..."
                          required />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login