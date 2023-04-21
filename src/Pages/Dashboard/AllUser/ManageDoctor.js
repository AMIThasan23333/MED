import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {



    const [DeletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const handleDeleteDoctor = doctor => {
        console.log(doctor)
    }

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
    <th>
    <label  onClick={() =>  setDeletingDoctor(doctor)} htmlFor="my-modal"  className="btn btn-outline btn-error">Delete</label>
       </th>
  </tr>)
   }
       
    </tbody>
  </table>
</div>
               
               {
                DeletingDoctor && <ConfirmationModal

                title= {` Are You sure you want to delete`}
                message= {`IF you delete ${DeletingDoctor.name} It can not be undone`}
                closeModal={closeModal}
                 modalData={DeletingDoctor}
                successAction={handleDeleteDoctor}>
                </ConfirmationModal>
               }

        </div>
    );
};

export default ManageDoctor;