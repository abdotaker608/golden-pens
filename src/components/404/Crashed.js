import React, {Component} from 'react';
import CrashImg from '../../static/images/crash.svg';


export class Crashed extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            catched: false
        }
    }

    componentDidCatch(){
        this.setState({catched: true});
    }
    

    render() {
        if (this.state.catched) {
            return (
                <div className='404 text-center pt-5'>
                    <h2 dir='ltr' style={{color: 'rgb(49, 115, 202)', fontWeight: 'bold'}}>Woops, App crashed..</h2>
                    <img src={CrashImg} alt='App Crashed' style={{width: '90%', height: 'auto', maxWidth: '768px'}}/>
                </div>
            )
        }
        return this.props.children;
    }
}

export default Crashed
