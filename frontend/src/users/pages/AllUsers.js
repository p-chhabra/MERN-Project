import React from 'react'
import VisitUser from '../components/VisitUser'

const DUMMY_USERS = [
  {name:"Ganja", places:5, rating:4.2,},
  {name:"Panty", places:8, rating:4.6,},
  {name:"Maddy", places:18, rating:4.9,},
  {name:"Bandook", places:7, rating:4.5,}
];

const AllUsers = () => {
  const allUsers = DUMMY_USERS.map((user)=>{
    return <VisitUser name={user.name} places={user.places} rating={user.rating}/>
  })
  return (
    <React.Fragment>
      <div className="flex items-center justify-center text-gray-300 text-3xl">
      <h1>All Users Page</h1>
      </div>
      {allUsers}
    </React.Fragment>
  )
}

export default AllUsers