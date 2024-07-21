import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
    const [movies,setMovies] = useState([])
    const [value, setValue] = useState();
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies))
        .catch((err) => console.log(err))
    },[]);

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
      };

      const handleChange = (e, val) => {
        const movie = movies.find((m) => m.title === val);
        console.log(movie);
        if (isUserLoggedIn) {
          navigate(`/booking/${movie._id}`);
        }
      };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "red" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "black" }}>
          <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight={"auto"} marginLeft="auto">
          <Autocomplete
          onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
                <TextField
                variant="standard"
                {...params}
               
                  sx={{
                    borderRadius: 2,
                    input: { color: "white" },
                    bgcolor: "red",
                    padding: "6px",
                  }}
                
                  placeholder="Search Movies"
                
               
                />
              )}
            />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >

            <Tab LinkComponent={Link} to="/movies" label="Movies" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}></Tab>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" LinkComponent={Link} to="/admin" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}/>
                <Tab label="Auth" LinkComponent={Link} to="/auth" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}/>
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" LinkComponent={Link} to="/user" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}/>
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" LinkComponent={Link} to="/add" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}/>
                <Tab label="Profile" LinkComponent={Link} to="/user-admin" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }} />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout" sx={{color:"black", fontFamily:"sans-serif",fontStyle:"italic" }}
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
             </Tabs>
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;