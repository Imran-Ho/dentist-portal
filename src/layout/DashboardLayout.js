import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/ContextProvider';
import useAdmin from '../hooks/useAdmin';
import Header from '../pages/Header/Header';

const DashboardLayout = () => {

    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)

    return (
        <div>
            <Header></Header>
            
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        {
                            isAdmin && <>
                            <li><Link to='/dashboard/users'>All Users</Link></li>
                            <li><Link to='/dashboard/add-doctor'>Add A Doctor</Link></li>
                            <li><Link to='/dashboard/manage-doctor'>Manage Doctors</Link></li>
                            </>
                        }
                        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;