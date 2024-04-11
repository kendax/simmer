// // components/SearchBar.js
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyInput = styled.input`
    width: 250px;
    height: 45px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #CCCCCC;
    border-radius: 25px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: black;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
        color: #999999; /* Light gray placeholder text */
    }

    @media (max-width: 640px) {
        width: 100px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        width: 100px;
        font-size: 12px;
    }
`;

const StyForm = styled.form`
    display: flex;
    align-items: center;

    @media (max-width: 480px) {
        min-width: 100px;
        flex-direction: column; /* Stack elements vertically on smaller screens */
        align-items: flex-start; /* Align items to the start */
    }
`;

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleKeyPress = event => {
            if (event.key === '/' && document.activeElement !== inputRef.current) {
                inputRef.current.focus();
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleChange = event => {
        setQuery(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        router.push(`/results?q=${encodeURIComponent(query)}`);
        setQuery('');
    };

    return (
        <StyForm onSubmit={handleSubmit}>
            <StyInput
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search... press Enter once done"
            />
        </StyForm>
    );
};

export default SearchBar;
