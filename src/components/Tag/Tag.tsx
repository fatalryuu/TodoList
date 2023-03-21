import React from 'react';
import './Tag.scss'

type PropsType = {
    text: String
    editMode: boolean
    deleteTag: null | ((id: number) => void)
    id: number
}

const Tag: React.FC<PropsType> = ({text, editMode, deleteTag, id}) => {
    const canDeleteClass: string = editMode ? "deleting" : "";
    const handleDelete = () => {
        if (deleteTag)
            deleteTag(id);
    }
    return (
        <div className={`tag-wrapper ${canDeleteClass}`} onClick={handleDelete}>
            {text}
        </div>
    );
};

export default Tag;