import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageDoctor = () => {

    const url = `http://localhost:5000/doctors`

    const { data : doctors = []} = useQuery({
        queryKey : ['doctors'],
        queryFn : async () => {
            try {
                const res =  await fetch(url, {
                    headers : {
                        authorization : `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data; 
            }
            catch(error){

            }
        }


    })




    return (

        <div>            
            <h1>ManageDoctor  {doctors?.length} </h1>

            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head*/}
    <thead>
      <tr>
        <th></th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Specialty</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody>
  

   {
    doctors?.map((doctor, i) =>     
    
    <tr >
    <th>{i+1}</th>
    <td>
    <div className="avatar">
  <div className="w-10 rounded">
    <img src={doctor.image}  alt=''/>
  </div>
</div>
    </td>
    <td>{doctor.name}</td>
    <td>{doctor.email}</td>
    <td>{doctor.specialty}</td>
    <th><button className="btn btn-outline btn-error">Delete </button> </th>
   
  </tr>)
   }
   

     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageDoctor;