import React from 'react'
import {Routes,Route} from 'react-router-dom'

// auth
import ConfirmMail from '../landingpage/Auth/confirm-mail'
import LockScreen from '../landingpage/Auth/lock-screen'
import Recoverpw from '../landingpage/Auth/recoverpw'
import SignIn from '../landingpage/Auth/sign-in'
import SignUp from '../landingpage/Auth/sign-up'
// errors
import Error404 from '../views/dashboard/errors/error404'
import Error500 from '../views/dashboard/errors/error500'
import Maintenance from '../views/dashboard/errors/maintenance'

const SimpleRouter = () => {
    return (
            <>
            <Routes>

                {/* auth */}
                <Route exact path="/auth/confirm-mail" element={ConfirmMail}/>
                <Route exact path="/auth/lock-screen"  element={LockScreen}/>
                <Route exact path="/auth/recoverpw"    element={Recoverpw}/>
                <Route exact path="/auth/sign-in"      element={SignIn}/>
                <Route exact path="/auth/sign-up"      element={SignUp}/>  
                {/* error */}
                <Route exact path="/errors/error404"   element={Error404}/>  
                <Route exact path="/errors/error500"  element={Error500}/>
                <Route exact path="/errors/maintenance" element={Maintenance}/>
            </Routes>
               
            </>
    )
}

export default SimpleRouter
