import { useState } from 'react'
import { Link } from 'react-router-dom';
import { authCreateUser } from '../../context/reduderActions';
import { UserAuth } from '../../context/AuthContext';

function Signup() {
    const [_, dispatch] = UserAuth();
    const [form, setForm] = useState({ user: '', password: '' });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authCreateUser(dispatch, { user: form.user, password: form.password });
        } catch (error) {
            console.log(error);
        }
        setForm({ user: '', password: '' })
    };

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4' >
            <h1 className='text-2xl font-bold py-2'>
                Create new account
            </h1>
            <p className='text-sm text-gray-500'>
                I really have a account! <Link to={'/'} className='text-blue-500 underline'>Sign In</Link>
            </p>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-bold mb-2'>User Name</label>
                    <input type='text' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' onClick={handleChange} required />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-bold mb-2'>Password</label>
                    <input type='password' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' onClick={handleChange} required />
                </div>
                <div className='mb-4'>
                    <button className=' bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:outline-none'>Submit!</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
