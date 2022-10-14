import React, {useState, useRef} from 'react';
import {normalizeNumber} from '../../Js/methods';
import {endpoint} from '../../API';


function Loves({user, chapter}) {

    const clickEffect = new Audio(require('../../static/sounds/click.mp3').default);

    const loveExists = chapter.loved;

    const [loved, setLoved] = useState(loveExists);
    const [processing, setProcessing] = useState(false);
    const [fakeCount, setFakeCount] = useState(null);

    const loveCount = useRef(chapter.loves);

    const updateLove = () => {
        setProcessing(true);
        loveCount.current = loveCount.current + (loved ? -1 : 1);
        setFakeCount(loveCount.current);
        fetch(`${endpoint}/stories/love/chapter/${chapter.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({user: user.pk})
        })
            .then(res => res.json()).then(() => setProcessing(false));
    }

    const pumpIt = e => {
        if (processing || !user) return;
        const target = e.currentTarget;
        target.classList.remove('pumped');
        void target.offsetWidth;
        target.classList.add('pumped');
        clickEffect.play();
        setLoved(!loved);
        updateLove();
    }

    return (
        <div className='loves-container mt-3 py-4 px-1'>
            <div onClick={pumpIt}>
                <span className={`${loved || !user ? 'active' : ''}`}><i className='fas fa-heart' /></span> 
                {normalizeNumber(fakeCount !== null ? fakeCount : chapter.loves)}
            </div>
        </div>
    )
}

export default Loves
