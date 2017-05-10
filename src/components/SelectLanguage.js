import React from 'react';
import PropTypes  from 'prop-types';

const SelectLanguage = (props) => {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className = "languages">
            {languages.map((lang) => {
                return (
                    <li
                        key = {lang} 
                        style = {lang === props.onSelectedLanguage ? {color: '#d0021b'}: null}
                        onClick = { () => props.onSelect(lang)}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    onSelectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
export default SelectLanguage;