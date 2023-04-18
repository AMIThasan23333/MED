import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
        const { signIn } = useContext(AuthContext);
        const [loginError, setLoginError] = useState('');


        const {data : specialties = [] , isLoading} = useQuery({
            queryKey : ['specialty'],
            queryFn : async () => {

                const res = await fetch('http://localhost:5000/appointmentSpecialty');

                const data = await res.json();

                return data;


            }
        })


        const handleAddDoctor = data => {
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
                    
                        <select className="select select-ghost w-full max-w-xs">
                            <option disabled selected>Please select a Specialty</option>
                           {
                            specialties.map(specialty =>  <option
                            
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                           }
                           
                    </select>
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add A Doctor" type="submit" />
                </form>
        </div>
    );
};

export default AddDoctor;