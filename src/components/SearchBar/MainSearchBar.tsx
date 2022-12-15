import { useState, useEffect, ChangeEvent } from 'react';
// mui
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// icons
import SearchIcon from '@mui/icons-material/Search';

export default function MainSearchBar ({ search }: { search?: string }) {
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (search) setQuery(s => search)
    }, [search])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    
    return (
        <Paper elevation={5} component="form" sx={{ width: '100%', height: 60 }}>
            <TextField 
                name="search"
                placeholder="Search a BIR transaction (e.g. TIN application)"
                value={query}
                onChange={handleSearchChange}
                InputProps={{ 
                    sx: { height: 60, fontSize: 18 },
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    endAdornment: <Button variant="contained" type="submit" size="large">SEARCH</Button>
                }}
                fullWidth
            />
        </Paper>
    )
}