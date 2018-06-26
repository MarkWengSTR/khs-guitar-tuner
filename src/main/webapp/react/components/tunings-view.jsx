import React from 'react';
import PageHeader from './header.jsx';
import TuningList from './tuning-list.jsx';
import '../css/index.css';

const TUNINGS = [
    {id: 1001, description: 'Standard', notes: 'e, a, d, g, b, e'},
    {id: 1002, description: 'DROP D', notes: 'd, a, d, g, b, e'},
    {id: 1003, description: 'DADGAD', notes: 'd, a, d, g, a, d'},
    {id: 1004, description: 'Half Step Down', notes: 'd#, g#, c#, f#, a#, d#'},
    {id: 1005, description: 'Whole Step Down', notes: 'd, g, c, f, a, d'},
    {id: 1006, description: 'OPEN C', notes: 'c, g, c, g, c, e'},
    {id: 1007, description: 'OPEN D', notes: 'd, a, d, f#, a, d'},
    {id: 1008, description: 'OPEN G', notes: 'd, g, d, g, b, d'}
];

class TuningsView extends React.Component {
    render(){
        return(
            <div className='page-view'>
                <PageHeader title='Keyhole Guitar Tuner'/>
                {//<TuningList tunings={this.props.tunings} />
                }
                <TuningList tunings={TUNINGS} />
                <a class="btn-floating btn-large teal accent-4 tuning-add"><i class="material-icons">add</i></a>
            </div>
        );
    }
}

export default TuningsView;