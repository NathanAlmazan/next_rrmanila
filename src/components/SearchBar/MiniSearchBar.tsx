import { ChangeEvent, FormEvent, useState } from 'react';
// mui
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// icons
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    onSearch: (query: string) => void,
    label: string
}

export default function MiniSearchBar ({ onSearch, label }: SearchProps) {
    const [query, setQuery] = useState<string>("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        onSearch(query)
    }

    return (
        <Paper elevation={3} component="form" onSubmit={handleSubmit} sx={{ width: '100%', height: 60 }}>
            <TextField 
                name="search"
                placeholder={label}
                value={query}
                onChange={handleSearchChange}
                InputProps={{ 
                    sx: { height: 60, fontSize: 18 },
                    endAdornment: 
                        <InputAdornment position="start">
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                }}
                fullWidth
            />
        </Paper>
    )
}