import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginIcons from '../assets/signin.gif';
import { SummaryApi } from '../common/index';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagePic = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md shadow-md'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <img
              src={data.profilePic || loginIcons}
              alt='profile preview'
              className='w-full h-full object-cover'
            />
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' accept='image/*' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full bg-slate-100 p-2 rounded-md outline-none'
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type='email'
                placeholder='Enter email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full bg-slate-100 p-2 rounded-md outline-none'
              />
            </div>

            <div>
              <label>Password:</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full bg-slate-100 p-2 pr-10 rounded-md outline-none'
                />
                <div
                  className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm password'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className='w-full bg-slate-100 p-2 pr-10 rounded-md outline-none'
                />
                <div
                  className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full transition-all'>
              Sign Up
            </button>
          </form>

          <p className='mt-5 text-center text-sm'>
            Already have an account?{" "}
            <Link to={"/login"} className='text-red-600 hover:text-red-700 underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
