import React from 'react';
import styles from './SearchBar.module.scss';



const Searchbar = ({ value, submitHandler, changeHandler }) => {

    const { searchbar, form, form_btn, form_label, form_input } = styles;

    return (
        <header className={searchbar}>
            <form className={form} onSubmit={submitHandler}>
                <input className={form_input}
                    type="text"
                    value={value}
                    onChange={changeHandler}
                    placeholder="Enter title"
                />
                <button className={form_btn} type="submit" >
                    <p className={form_label}>Search</p>
                </button>
            </form>
        </header>
    );

}

export default Searchbar;