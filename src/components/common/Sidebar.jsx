import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Sidebar() {
  
  return (
    <>
           <div className="card shadow mb-5 sidebar">
               <div className="card-body  p-4 ">
              <ul>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/items">Items</NavLink>
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/brands">Brands</NavLink>
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/models">Models</NavLink>
                </li>
              </ul>

            </div>
          </div>
    </>
  )
}

export default Sidebar
