import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUser = () => {


    const {data : users = [] } = useQuery({
        queryKey : ['users'],
        queryFn : async() => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            console.log(data)
            return data;
        }
    })


    const handleAdmin = id => {

        fetch(`http://localhost:5000/users/admin/${id}`, {

       method : 'PUT'

        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })
    }



    return (
        <div>
            <h1>All User</h1>

            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Delete</th>

      </tr>
    </thead>
    <tbody>
   
        {
            users.map((user,i) => 

                <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td> <button onClick={ () =>handleAdmin(user._id)}  className='btn  btn-xs btn-primary'>Make Admin</button></td>
                <td> <button  className='btn  btn-xs btn-primary'> Delete </button></td>
              </tr>
            )
        }    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUser;