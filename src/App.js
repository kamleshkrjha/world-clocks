import React from 'react';

import { Clock } from './components';

import styles from './App.module.css';

class App extends React.Component {

    render() {
        return (
            <div className={styles.container} >
                <Clock place="New york" timeDiff="-0500" />
                <Clock place="London" timeDiff="+0000" />
                <Clock place="CPH" timeDiff="+0100" /> 
                <Clock place="Delhi" timeDiff="+0530" />
                <Clock place="Beijing" timeDiff="+0800" />
                <Clock place="Canberra" timeDiff="+1100" />   
            </div>
        )
    }
}

export default App;