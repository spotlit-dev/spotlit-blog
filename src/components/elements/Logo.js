import React from 'react';
import Link from 'next/link';

const Logo = ({ color }) => {
    if (color && color === 'white') {
        return (
            <Link href="/">
                <a className="ps-logo">
                    <img src="/static/img/logo-white.png" alt="Spotlit Logo" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href="/">
                <a className="ps-logo">
                    <img src="/static/img/logo-dark.png" alt="Spotlit Logo" />
                </a>
            </Link>
        );
    }
};

export default Logo;
