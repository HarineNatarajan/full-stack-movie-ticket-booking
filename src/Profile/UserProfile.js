import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBooking, getUserDetails, updateUser, deleteUser } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    getUserBooking()
      .then((res) => {
        console.log("User bookings response:", res); // Debug log
        setBookings(res.bookings || []); // Ensure res.bookings is an array
      })
      .catch((err) => console.log("Error fetching user bookings:", err));

    getUserDetails()
      .then((res) => {
        console.log("User details response:", res); // Debug log
        setUser(res.user || null); // Ensure res.user is valid
        if (res.user) {
          setUpdatedName(res.user.name);
          setUpdatedEmail(res.user.email);
        }
      })
      .catch((err) => console.log("Error fetching user details:", err));
  }, []);

  const handleDeleteBooking = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log("Delete booking response:", res); // Debug log
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log("Error deleting booking:", err));
  };

  const handleDeleteProfile = () => {
    const userId = localStorage.getItem("userId");
    deleteUser(userId)
      .then((res) => {
        console.log("Delete user response:", res);
        // Handle successful deletion (e.g., redirect to login page)
      })
      .catch((err) => console.log("Error deleting user:", err));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const userId = localStorage.getItem("userId");
    updateUser(userId, { name: updatedName, email: updatedEmail })
      .then((res) => {
        console.log("Update user response:", res);
        setUser(res.user);
        setIsEditing(false);
      })
      .catch((err) => console.log("Error updating user:", err));
  };

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
            
          >
            <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }} />
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button onClick={handleSaveProfile} color="primary" variant="contained">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography
                  padding={1}
                  width={"auto"}
                  textAlign={"center"}
                  border={"1px solid #ccc"}
                  borderRadius={6}
                >
                  Name: {user.name}
                </Typography>
                <Typography
                  mt={1}
                  padding={1}
                  width={"auto"}
                  textAlign={"center"}
                  border={"1px solid #ccc"}
                  borderRadius={6}
                >
                  Email: {user.email}
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button onClick={handleEditProfile} color="primary" variant="contained" >
                  Edit
                </Button>
                <Button onClick={handleDeleteProfile} color="error" variant="contained">
                  Delete
                </Button>
                </Box>
              </>
            )}
          </Box>
        )}
        {bookings && bookings.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2}>
              Bookings
            </Typography>
            <Box margin={"auto"} display="flex" flexDirection={"column"} width="80%">
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                      Movie: {booking.movie.title}
                    </ListItemText>
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                      Seat: {booking.seatNumber}
                    </ListItemText>
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                      Date: {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton onClick={() => handleDeleteBooking(booking._id)} color="error">
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
