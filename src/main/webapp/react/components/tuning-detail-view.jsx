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
import Sound from 'react-sound';
import PageHeader from './header.jsx';
import Strum from './strum.jsx';
import Tune from './tune.jsx';
import fret from "../fret2.jpg";
import '../css/materialize.min.css';
import '../css/index.css';
import { NavLink } from 'react-router-dom';

class PageDetailView extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            note: null,
            status: 'PLAYING',
            desc: '',
            notes: '',
            chordPlaying: false
        };
        this.uppercase = this.uppercase.bind( this );
        this.isPlaying = this.isPlaying.bind( this );
        this.newClick = this.newClick.bind( this );
    }

    handleChord() {
        this.setState( { chordPlaying: true } );

    }

    handleFinish() {
        this.setState( { chordPlaying: false } );
    }
    componentWillMount() {
        let currentComponent = this;
        fetch( '/api-tunings' )
            .then( results => { return results.json(); } )
            .then( data => {
                let tunings = data._embedded.tunings;
                tunings.forEach(( tuning ) => {
                    let path = '/tunings/' + tuning.id;
                    if ( path === window.location.pathname ) {
                        currentComponent.setState( { desc: tuning.description, notes: tuning.notes } );
                    }
                } );
            } )
            .catch(( error ) => { console.log( error ) } );
    }

    uppercase( note ) {
        if ( note ) {
            return note.toUpperCase();
        }
    }

    isPlaying( note ) {
        return this.state.status === 'PLAYING' && this.state.note === note ? true : false;
    }

    newClick( n ) {
        if ( !this.state.chordPlaying ) {
            this.setState( { note: n, status: this.isPlaying( n ) ? 'STOPPED' : 'PLAYING', } )
        }
    }

    render() {
        var list = this.state.notes.split( ',' );
        var audioList = [];
        
        audioList.push(buildAudio( list[0], '0' ));
        audioList.push(buildAudio( list[1], '1' ));
        audioList.push(buildAudio( list[2], '2' ));
        audioList.push(buildAudio( list[3], '3' ));
        audioList.push(buildAudio( list[4], '4' ));
        audioList.push(buildAudio( list[5], '5' ));

        return (
            <div className="detail-view">
                <PageHeader title={this.state.desc} isMainPage = {false}/>
                <NavLink to="/" class="btn-small blue darken-4 detail-back"><i class="material-icons left">keyboard_backspace</i>back</NavLink>
                <div className="detail-inst">
                    <div className='detail-inst-header'>
                        <h4>{this.state.desc} Guitar Tuning:</h4>
                    </div>
                    <ul>
                        <li>Click on a <em>SINGLE NOTE</em> to hear that note<br />
                            played on a loop. Click it again to stop the loop.</li><br />
                        <li>Click on <em>TUNE</em> for each note to be played<br />
                            five times. Click it again to stop the tuning cycle.</li><br />
                        <li><div class="hide-on-med-and-down">Click on <em>STRUM</em> to hear the notes<br />
                            played in one strum.</div></li>
                    </ul>
                </div>

                <Tune list={audioList} />
                <div class="hide-on-med-and-down"><Strum list={audioList} isPlaying={() => this.handleChord()} isStopped={() => this.handleFinish()} /></div>
                <Sound url={this.state.note} playStatus={this.state.status} loop={true} playFromPosition={250} />

                <div className="detail-image">
                    <img src={fret} alt="Fret" />
                    <div class="row">
                        <div class="col 4"></div>
                        <div class="col 1 detail-note first-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[0] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[0] )}>
                                {this.uppercase( list[0] )}
                            </span>
                        </div>
                        <div class="col 1 detail-note second-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[1] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[1] )}>
                                {this.uppercase( list[1] )}
                            </span>
                        </div>
                        <div class="col 1 detail-note third-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[2] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[2] )}>
                                {this.uppercase( list[2] )}
                            </span>
                        </div>
                        <div class="col 1 detail-note fourth-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[3] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[3] )}>
                                {this.uppercase( list[3] )}
                            </span>                        </div>
                        <div class="col 1 detail-note fifth-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[4] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[4] )}>
                                {this.uppercase( list[4] )}
                            </span>
                        </div>
                        <div class="col 1 detail-note sixth-note">
                            <span className="note"
                                style={{ color: this.isPlaying( audioList[5] ) ? '#0d47a1' : 'white' }}
                                onClick={() => this.newClick( audioList[5] )}>
                                {this.uppercase( list[5] )}
                            </span>
                        </div>
                    </div>
                </div>
               
                
            </div>
        );
    }
}

function buildAudio( note, index ) {
    var sharp = "";
    if ( note && note.indexOf( "#" ) >= 0 ) {
        sharp = "-sharp";
        note = note.replace( "#", "" );
    }
    return "/audio/" + note + sharp + "-" + index + ".mp3";
}

export default PageDetailView;