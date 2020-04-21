import React from 'react';

import { Clock } from './components';

import styles from './App.module.css';

class App extends React.Component {

    render() {
        return (
            <div className={styles.container} >
                <Clock place="New york" timeDiff="-0500" code="US"/>
                <Clock place="London" timeDiff="+0000" code="GB"/>
                <Clock place="Copenhagen" timeDiff="+0100" code="DK"/> 
                <Clock place="Delhi" timeDiff="+0530" code="IN"/>
                <Clock place="Beijing" timeDiff="+0800" code="CN"/>
                <Clock place="Canberra" timeDiff="+1100" code="AU"/>   
            </div>
        )
    }
}

export default App;