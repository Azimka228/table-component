import React, {FC, useState} from 'react';
import {FormControl, Input, InputAdornment, InputLabel} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type tableSearchBarType = {
  onChange: (searchedVal: string) => void;
};

export const TableSearchBar: FC<tableSearchBarType> = ({onChange}) => {
  const [searchBarValue, setSearchBarValue] = useState<string>('');

  const handleChangeSearchBarValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchBarValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };

  const handleCloseSearching = () => {
    setSearchBarValue('');
  };

  const searchBarIcons =
    searchBarValue.length > 0 ? (
      <CloseIcon onClick={handleCloseSearching} />
    ) : (
      <SearchIcon />
    );
  return (
    <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
      <InputLabel htmlFor="table-search-bar">Search</InputLabel>
      <Input
        id="table-search-bar"
        value={searchBarValue}
        onChange={handleChangeSearchBarValue}
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>{searchBarIcons}</IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
