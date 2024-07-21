import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Modal,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  getAdminById,
  updateAdmin,
  deleteAdmin,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../api-helpers/api-helpers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [editingMovie, setEditingMovie] = useState(false);
  const [addingMovie, setAddingMovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  const handleEditAdmin = () => {
    setEditingAdmin(true);
    setAdminEmail(admin.email);
  };

  const handleUpdateAdmin = () => {
    updateAdmin(admin._id, { email: adminEmail })
      .then((res) => {
        setAdmin(res.admin);
        setEditingAdmin(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(admin._id)
      .then(() => {
        // Handle successful deletion, e.g., redirect to another page
      })
      .catch((err) => console.log(err));
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(true);
    setSelectedMovie(movie);
    setMovieDetails(movie);
  };

  const handleUpdateMovie = () => {
    updateMovie(selectedMovie._id, movieDetails)
      .then((res) => {
        setAdmin((prev) => ({
          ...prev,
          addedMovies: prev.addedMovies.map((movie) =>
            movie._id === res.movie._id ? res.movie : movie
          ),
        }));
        setEditingMovie(false);
        setSelectedMovie(null);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId)
      .then(() => {
        setAdmin((prev) => ({
          ...prev,
          addedMovies: prev.addedMovies.filter((movie) => movie._id !== movieId),
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleAddMovie = () => {
    addMovie(movieDetails)
      .then((res) => {
        setAdmin((prev) => ({
          ...prev,
          addedMovies: [...prev.addedMovies, res.movie],
        }));
        setAddingMovie(false);
        setMovieDetails({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display="flex">
      {admin && (
        <Box flexDirection={"column"} justifyContent="center" alignItems={"center"} width={"30%"} padding={3} >
          <AccountCircleIcon sx={{ fontSize: "20rem", textAlign: "center", ml: 3 }} />
          <Typography mt={1} padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>
            Email: {admin.email}
          </Typography>
          <Box  gap={2} mt={2}>
          <Button onClick={handleEditAdmin} color="primary" variant="contained">
            Edit
          </Button>
          <Button onClick={handleDeleteAdmin} color="error" variant="contained">
            Delete
          </Button>
          </Box>
        </Box>
      )}
      {admin && admin.addedMovies.length > 0 && (
        <Box width={"70%"} display="flex" flexDirection={"column"}>
          <Typography variant="h3" fontFamily={"cursive"} textAlign="center" padding={2}>
            Added Movies
          </Typography>
          <Box margin={"auto"} display="flex" flexDirection={"column"} width="80%">
           
            <List>
              {admin.addedMovies.map((movie) => (
                <ListItem
                  key={movie._id}
                  sx={{ bgcolor: "black", color: "white", textAlign: "center", margin: 1, fontFamily:"cursive" }}
                >
                  <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>Movie: {movie.title}</ListItemText>
                  <Button
               onClick={() => handleEditMovie(movie)}
             sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "brown" } }}
         variant="contained"
          >
         Edit
       </Button>
                  <IconButton onClick={() => handleDeleteMovie(movie._id)} color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
      <Modal open={editingAdmin} onClose={() => setEditingAdmin(false)}>
        <Box
          sx={{
            bgcolor: "white",
            padding: 4,
            borderRadius: 2,
            margin: "auto",
            mt: 8,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Edit Admin</Typography>
          <TextField value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
          <Button onClick={handleUpdateAdmin} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
      <Modal open={editingMovie} onClose={() => setEditingMovie(false)}>
        <Box
          sx={{
            bgcolor: "white",
            padding: 4,
            borderRadius: 2,
            margin: "auto",
            mt: 8,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Edit Movie</Typography>
          <TextField
            label="Title"
            value={movieDetails.title}
            onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Description"
            value={movieDetails.description}
            onChange={(e) => setMovieDetails({ ...movieDetails, description: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Release Date"
            type="date"
            value={movieDetails.releaseDate}
            onChange={(e) => setMovieDetails({ ...movieDetails, releaseDate: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Poster URL"
            value={movieDetails.posterUrl}
            onChange={(e) => setMovieDetails({ ...movieDetails, posterUrl: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Featured"
            value={movieDetails.featured}
            onChange={(e) => setMovieDetails({ ...movieDetails, featured: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Actors"
            value={movieDetails.actors}
            onChange={(e) => setMovieDetails({ ...movieDetails, actors: e.target.value })}
            sx={{ color: "white" }}
          />
          <Button onClick={handleUpdateMovie} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
      <Modal open={addingMovie} onClose={() => setAddingMovie(false)}>
        <Box
          sx={{
            bgcolor: "white",
            padding: 4,
            borderRadius: 2,
            margin: "auto",
            mt: 8,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Add Movie</Typography>
          <TextField
            label="Title"
            value={movieDetails.title}
            onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Description"
            value={movieDetails.description}
            onChange={(e) => setMovieDetails({ ...movieDetails, description: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Release Date"
            type="date"
            value={movieDetails.releaseDate}
            onChange={(e) => setMovieDetails({ ...movieDetails, releaseDate: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Poster URL"
            value={movieDetails.posterUrl}
            onChange={(e) => setMovieDetails({ ...movieDetails, posterUrl: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Featured"
            value={movieDetails.featured}
            onChange={(e) => setMovieDetails({ ...movieDetails, featured: e.target.value })}
            sx={{ color: "white" }}
          />
          <TextField
            label="Actors"
            value={movieDetails.actors}
            onChange={(e) => setMovieDetails({ ...movieDetails, actors: e.target.value })}
            sx={{ color: "white" }}
          />
          <Button onClick={handleAddMovie} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminProfile;
