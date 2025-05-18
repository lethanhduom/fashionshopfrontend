import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) onSearch(query);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                marginLeft: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                width: '100%',
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                style={{
                    flexGrow: 1,
                    backgroundColor: 'transparent',
                    border: '1px solid #D9D9D9',
                    outline: 'none',
                    padding: '5px',
                    color: '#000', // chỉnh màu chữ thành màu đen
                    borderRadius: '20px',
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: '5px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
            >
                <Search size={30} />
            </button>
        </div>
    );
};

export default SearchBar;
