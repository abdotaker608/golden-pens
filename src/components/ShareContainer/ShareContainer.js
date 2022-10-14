import React from 'react';
import {
    FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, FacebookIcon,
    TwitterIcon, WhatsappIcon, TelegramIcon
} from 'react-share';


function ShareContainer({url, hashtags, title}) {

    const shareButtons = [
        {Button: FacebookShareButton, Icon: FacebookIcon, id: 'fb'},
        {Button: TwitterShareButton, Icon: TwitterIcon, id: 'twitter'},
        {Button: WhatsappShareButton, Icon: WhatsappIcon, id: 'whatsapp'},
        {Button: TelegramShareButton, Icon: TelegramIcon, id: 'telegram'}
    ]

    return (
        <div className='share-container'>
            {
                shareButtons.map(({Button, Icon, id}) => (
                    <Button url={url} hashtags={hashtags} title={title} hashtag={hashtags[0]} style={{margin: '0 5px'}} key={id}>
                        <Icon size={35} round={true} />
                    </Button>
                ))
            }
        </div>
    )
}

export default ShareContainer
