/*Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TuningsView from './tunings-view.jsx';
import AboutView from './about-view.jsx';
import PageDetailView from './tuning-detail-view.jsx';
import PageShell from './shell.jsx';

class Navigation extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={PageShell(TuningsView)} />
                    <Route path='/about' component={PageShell(AboutView)} />
                    <Route path='/tunings/' component={PageShell(PageDetailView)} />
                    <Route path='/error' component={PageShell(TuningsView)} />
                    <Route exact path='/tunings/**' component={PageShell(TuningsView)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Navigation;