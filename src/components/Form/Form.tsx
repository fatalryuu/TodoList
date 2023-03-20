import React, {useState} from 'react';
import './Form.scss';

type PropsType = {
    putTodo: (value: String) => void
}

const Form: React.FC<PropsType> = ({putTodo}) => {
    const [value, setValue] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        putTodo(value);
        setValue("");
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter text..." className="input" value={value} onChange={e => setValue(e.target.value)} required/>
        </form>
    );
};

export default Form;