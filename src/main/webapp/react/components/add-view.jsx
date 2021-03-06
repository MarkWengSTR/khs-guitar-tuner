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
import { Modal } from 'react-materialize';
import '../css/index.css';
import '../css/materialize.min.css';

const NOTES = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
class AddView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            notes: '',
            errorMessageN: '',
            saveDismiss: true,
            errorMessageD: '',
            tunings: [],
            lastTune: 0,
            lastId: 0
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value }, function () {
            this.handleChangeNotes();
            this.handleChangeDescription();
        });
    }
    handleChangeDescription() {
        if (this.state.notes.length > 3 && this.state.description.length < 1) {
            this.setState({ errorMessageD: "Please name your tuning", saveDismiss: true });
        }
        else if (this.state.description.length >= 1) {
            this.setState({ errorMessageD: '' });
        }
    }
    handleChangeNotes() {
        if (this.state.notes.length > 3) {
            let noteCount = 0;
            let list = this.state.notes.split(',');
            for (let i = 0; i < list.length; i++) {
                list[i] = list[i].replace(" ", "");
                for (let k = 0; k < NOTES.length; k++) {
                    if (list[i] === NOTES[k]) {
                        noteCount++;
                    }
                }
            }
            if (noteCount === 6 && list.length === 6) {
                this.setState({ errorMessageN: '', saveDismiss: false, list: list });
            }
            else if (noteCount < list.length - 1 || list.length > 7) {
                this.setState({ errorMessageN: "Please enter 6 valid notes", saveDismiss: true })
            }
            else {
                this.setState({ errorMessageN: '', saveDismiss: true })
            }
        }
    }
    cancel() {
        this.setState({ description: '', notes: '', saveDismiss: true, errorMessageD: '', errorMessageN: '' });
    }
    getLength(tunings){
     if (tunings){
     return tunings.length
     }
    }
    
    componentWillMount() {
        fetch( '/api-tunings' )
            .then( results => { return results.json(); } )
            .then( data => {
                let tunings = data._embedded.tunings;
                let maxId;
                tunings.forEach(tuning => {
                    maxId = tuning.id;
                });
                this.setState( {lastId: maxId + 1});
            } )
            .catch(( error ) => { console.log( error ) } );
    }
    
    handleClick(event) {
		fetch('/api-tunings', {
		  method: 'post',
		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({id: this.state.lastId, description: this.state.description, notes: this.state.notes})
		})
		let newTun = {id: this.state.lastId, description: this.state.description, notes: this.state.notes};
		this.props.reloadNew(newTun);
		this.setState({description: '', notes: '', lastId: this.state.lastId + 1, saveDismiss: true});
    }
    render() {
        return (
            <Modal
                header='Add Tuning' trigger={<a class='btn-floating btn-large blue darken-4 tuning-add'><i class="material-icons right">add</i></a>}
                actions={
                    <div class="modal-footer">
                        <a class="btn-small blue darken-4 modal-action modal-close" onClick={() => this.cancel()}><i class="material-icons right">cancel</i>cancel</a>
                        {' '}
                        <a class="btn-small blue darken-4 modal-close" onClick={() => this.handleClick()} disabled={this.state.saveDismiss}><i class="material-icons right">save</i>save</a>
                    </div>
                }>
                <h5>Description</h5>
                <div className='input-field'>
                    <input type="text" placeholder="Tuning Name" name="description" value={this.state.description} maxLength='35' onChange={(value) => this.onChange(value)} />
                    <label>{this.state.errorMessageD}</label>
                </div>
                <h5>Notes</h5>
                <div className='input-field'>
                    <input type="text" placeholder="e, a, d, g, b, e" name="notes" value={this.state.notes} onChange={(value) => this.onChange(value)} />
                    <label>{this.state.errorMessageN}</label>
                </div>
            </Modal>
        );
    }
}


export default AddView;