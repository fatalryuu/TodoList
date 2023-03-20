import React, {useState} from 'react';
import './Form.scss';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
    putTodo: (value: string) => void
    filterTags: (value: string) => void
    showTodos: () => void
}

const Form: React.FC<PropsType> = ({putTodo, filterTags, showTodos}) => {
    const [text, setText] = useState("");
    const [isFilter, setIsFilter] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        isFilter ? filterTags(text) : putTodo(text);
        setText("");
    }

    const handleFilter = () => {
        setIsFilter(!isFilter);
        if (isFilter)
            showTodos(); //show todos after filter
        setText(isFilter ? "" : "#");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder={isFilter ? "Enter tag..." : "Enter text..."}
                   className="input" value={text} onChange={e => setText(e.target.value)}
                   autoFocus={isFilter} required/>
            <button type="submit" className="plus">{isFilter ? <SearchIcon /> : <AddIcon />}</button>
            <button type="button" className="filter" onClick={handleFilter}><FilterAltIcon /></button>
        </form>
    );
};

export default Form;