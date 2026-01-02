import { useState } from 'react';
import Router from 'next/router';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  async function submit(e){
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    if(res.ok){
      Router.push('/admin/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
