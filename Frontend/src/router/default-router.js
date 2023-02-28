import React from 'react'
import Index from '../views/dashboard/index'
import {Routes,Route} from 'react-router-dom'
// user


import userProfileEdit from '../views/dashboard/app/user-privacy-setting';







//TransitionGroup
import {TransitionGroup,CSSTransition} from "react-transition-group";
//Special Pages



import Calender from '../views/dashboard/special-pages/calender';


const DefaultRouter = () => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Routes>
                    <Route path="/dashboard" exact element={Index} />
                    
                    
                 
                    
                    
                     
                     <Route path="/dashboard/special-pages/calendar" exact element={Calender}/>
                  
                   
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DefaultRouter
