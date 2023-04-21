import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {


    const navigate = useNavigate('')

    const { register, formState: { errors }, handleSubmit } = useForm();
        const { signIn } = useContext(AuthContext);

        const [loginError, setLoginError] = useState('');

        const imageHostKey =process.env.REACT_APP_imgb_key;
        console.log(imageHostKey);
        const {data : specialties = [] , isLoading} = useQuery({
            queryKey : ['specialty'],
            queryFn : async () => {
                const res = await fetch('http://localhost:5000/appointmentSpecialty');
                const data = await res.json();
                return data;
            }
        })


        const handleAddDoctor = data => {
           
            const image = data.image[0];

            console.log(image)

            const formData = new FormData();

            formData.append('image' , image);


            const url =`https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`


            fetch(url, {

                method :'POST',   
                body : formData,        
            })
            .then(res => res.json())
            .then(imgData =>{
            
                if(imgData.success){

                    console.log(imgData.data.url);

                }

                const doctor = {

                    name : data.name,
                    email : data.email,
                    specialty : data.specialty,
                    image : imgData.data.url,

                }

                fetch('http://localhost:5000/doctors', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json',

                        authorization: `bearer ${localStorage.getItem('accessToken')}`                       
                    },

                    body: JSON.stringify(doctor)


                })

                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success(`${data.name} is added successfully  `)

                    navigate('/dashoboard/manageDpctor')
                })

            
            })


        }


    return (

        <div className='w-96 p-7'>

          <form onSubmit={handleSubmit( handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Specialty</span></label>
                    
                        <select
                        
                        {...register('specialty')}


                        className="select select-ghost w-full max-w-xs">
                            {/* <option disabled selected>Please select a Specialty</option> */}
                           {
                            specialties.map(specialty =>  <option
                            
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                           }
                           
                    </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add A Doctor" type="submit" />
                </form>
        </div>
    );
};

export default AddDoctor;