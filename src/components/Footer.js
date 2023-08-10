import React from 'react';
import LanguageSelector from './LanguageSelector';

const Footer = () => {

    return (
        <footer className="shadow-sm footer text-center mt-2 fixed-bottom">
            <div className='row align-items-end'>
                <div className='col-2'></div>
                <div className='col-8 py-3 px-0 text-success'>
                    Copyright © 2023 | Made by Halil
                </div>
                <div className='col-2 p-1'>
                    <LanguageSelector />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
