import React from 'react'
import Index from '../views/dashboard/index'
import {Routes,Route} from 'react-router-dom'
// user
import UserProfile from '../views/dashboard/app/user-profile';
import UserAdd from '../views/dashboard/app/user-add';
import UserList from '../views/dashboard/app/user-list';
import userProfileEdit from '../views/dashboard/app/user-privacy-setting';
// widget
import Widgetbasic from '../views/dashboard/widget/widgetbasic';
import Widgetcard from '../views/dashboard/widget/widgetcard';
import Widgetchart from '../views/dashboard/widget/widgetchart';
// icon
import Solid from '../views/dashboard/icons/solid';
import Outline from '../views/dashboard/icons/outline';
import DualTone from '../views/dashboard/icons/dual-tone';
// Form
import FormElement from '../views/dashboard/from/form-element';
import FormValidation from '../views/dashboard/from/form-validation';
import FormWizard from '../views/dashboard/from/form-wizard';
// table
import BootstrapTable from '../views/dashboard/table/bootstrap-table';
import TableData from '../views/dashboard/table/table-data';

// map
import Vector from '../views/dashboard/maps/vector';
import Google from '../views/dashboard/maps/google';

//extra
import PrivacyPolicy from '../views/dashboard/extra/privacy-policy';
import TermsofService from '../views/dashboard/extra/terms-of-service';

//TransitionGroup
import {TransitionGroup,CSSTransition} from "react-transition-group";
//Special Pages
import Billing from '../views/dashboard/special-pages/billing';
import Kanban from '../views/dashboard/special-pages/kanban';
import Pricing from '../views/dashboard/special-pages/pricing';
import Timeline from '../views/dashboard/special-pages/timeline';
import Calender from '../views/dashboard/special-pages/calender';
//admin
import Admin from '../views/dashboard/admin/admin';

const DefaultRouter = () => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Routes>
                    <Route path="/dashboard" exact element={Index} />
                    {/* user */}
                    <Route path="/dashboard/app/user-profile"     exact element={UserProfile} />
                    <Route path="/dashboard/app/user-add"         exact element={UserAdd}/>
                    <Route path="/dashboard/app/user-list"        exact element={UserList}/>
                    <Route path="/dashboard/app/user-privacy-setting" exact element={userProfileEdit}/>
                     {/* widget */}
                     <Route path="/dashboard/widget/widgetbasic"   exact element={Widgetbasic}/>
                     <Route path="/dashboard/widget/widgetcard"    exact element={Widgetcard}/>
                     <Route path="/dashboard/widget/widgetchart"   exact element={Widgetchart}/>
                     {/* icon */}
                     <Route path="/dashboard/icon/solid"           exact element={Solid}/>
                     <Route path="/dashboard/icon/outline"         exact element={Outline}/>
                     <Route path="/dashboard/icon/dual-tone"       exact element={DualTone}/>
                     {/* From */}
                     <Route path="/dashboard/form/form-element"    exact element={FormElement}/>
                     <Route path="/dashboard/form/form-validation" exact element={FormValidation}/>
                     <Route path="/dashboard/form/form-wizard"     exact element={FormWizard}/>
                     {/* table */}
                     <Route path="/dashboard/table/bootstrap-table" exact element={BootstrapTable}/>
                     <Route path="/dashboard/table/table-data"      exact element={TableData}/>
                     {/*special pages */}
                     <Route path="/dashboard/special-pages/billing" exact element={Billing}/>
                     <Route path="/dashboard/special-pages/kanban" exact element={Kanban}/>
                     <Route path="/dashboard/special-pages/pricing" exact element={Pricing}/>
                     <Route path="/dashboard/special-pages/timeline" exact element={Timeline}/>
                     <Route path="/dashboard/special-pages/calendar" exact element={Calender}/>
                     {/* map */}
                     <Route path="/dashboard/map/vector" exact element={Vector}/>
                     <Route path="/dashboard/map/google" exact element={Google}/>
                     {/* extra */}
                     <Route path="/dashboard/extra/privacy-policy" exact element={PrivacyPolicy}/>
                     <Route path="/dashboard/extra/terms-of-service" exact element={TermsofService}/>
                     {/*admin*/}
                     <Route path="/dashboard/admin/admin" exact element={Admin}/>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DefaultRouter
