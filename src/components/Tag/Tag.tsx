import React from 'react';
import './Tag.scss'

type PropsType = {
    text: String
}

const Tag: React.FC<PropsType> = ({text}) => {
    return (
        <div className="tag-wrapper">
            {text}
        </div>
    );
};

export default Tag;