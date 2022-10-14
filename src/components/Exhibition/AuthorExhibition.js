import React from 'react';
import Exhibition from './Exhibition';

function AuthorExhibition({match}) {
    return (
        <Exhibition title='' author={match.params.authorId} />
    )
}

export default AuthorExhibition
