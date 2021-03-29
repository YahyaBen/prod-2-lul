import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Erreur from '../Error/Erreur'
import HomePage from '../Error/HomePage'
import Users from '../Users/Users'
import Admins from '../Users/Admins'


const LaRoute = () => {

    //http://localhost:3001/Error

    //http://localhost:3001/user/Admin

    //http://localhost:3001/user/Agent


    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Error" component={Erreur} />
          <Route exact path="/User/:ID" render={() => <Users />} />
          <Route exact path="/Admin/:ID" render={() => <Admins />} />
        </Switch>
      </div>
    );

}

export default LaRoute
