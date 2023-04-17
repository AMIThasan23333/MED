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
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
   
        {
            users.map((user,i) => 

                <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td></td>
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