import React, { Component } from 'react';
import SocialLogin from 'react-social-login';

export class SocialButton extends Component {
    render() {
        return (
            <button type='button' className='social-btn' onClick={this.props.triggerLogin} {...this.props}>
                {this.props.children}
            </button>
        )
    }
}

export default SocialLogin(SocialButton);
