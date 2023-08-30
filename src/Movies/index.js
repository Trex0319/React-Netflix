// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [moviesAPI, setMoviesAPI] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies")
//       .then((response) => {
//         setMovies(response.data);
//         setMoviesAPI(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const filterMovie = (genre = "") => {
//     if (genre !== "") {
//       const newMovies = moviesAPI.filter((m) => m.genre === genre);
//       setMovies(newMovies);
//     } else {
//       setMovies(moviesAPI);
//     }
//   };

//   return (
//     <>
//       <Title order={3} align="center">
//         Movies
//       </Title>
//       <Space h="20px" />
//       <Group>
//         <Button
//           onClick={() => {
//             filterMovie("");
//           }}
//         >
//           All
//         </Button>
//         <Button
//           onClick={() => {
//             filterMovie("Drama");
//           }}
//         >
//           Drama
//         </Button>
//         <Button
//           onClick={() => {
//             filterMovie("Fantasy");
//           }}
//         >
//           Fantasy
//         </Button>
//         <Button
//           onClick={() => {
//             filterMovie("Action");
//           }}
//         >
//           Action
//         </Button>
//         <Button
//           onClick={() => {
//             filterMovie("Sci-Fi");
//           }}
//         >
//           Sci-fi
//         </Button>
//       </Group>
//       <Space h="20px" />
//       <Grid>
//         {movies
//           ? movies.map((movie) => {
//               return (
//                 <Grid.Col key={movie._id} span={4}>
//                   <Card withBorder shadow="sm" p="20px">
//                     <Title order={5}>{movie.title}</Title>
//                     <Space h="20px" />
//                     <Group position="center" spacing="5px">
//                       <Badge color="green">{movie.director}</Badge>
//                       <Badge color="yellow">{movie.genre}</Badge>
//                       <Badge color="grape">{movie.rating}</Badge>
//                     </Group>
//                   </Card>
//                 </Grid.Col>
//               );
//             })
//           : null}
//       </Grid>
//     </>
//   );
// }

// export default Movies;

// with api
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Divider,
  Button,
} from "@mantine/core";
function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2000/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filterMovie = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:2000/movies?genre=" + genre
      );
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieDelete = async (movie_id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:2000/movies/" + movie_id,
      });
      // show movie is delete message
      notifications.show({
        title: "Movie Deleted",
        color: "green",
      });
      // method 1 (modify the state) - filter out the deleted movie
      const newMovies = movies.filter((m) => m._id !== movie_id);
      setMovies(newMovies);
      // method 2 (recall the api for movies again)
      // axios
      //   .get("https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies")
      //   .then((response) => {
      //     setMovies(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Movies
        </Title>
        {/* <Button component={Link} to="/movie_add" color="green">
          Add New
        </Button> */}
        <Button
          color="green"
          onClick={() => {
            navigate("/movie_add");
          }}
        >
          Add New
        </Button>{" "}
      </Group>
      <Space h="20px" />
      <Title order={3} align="center">
        Movies
      </Title>
      <Space h="20px" />
      <Group position="center">
        <Button
          onClick={() => {
            filterMovie("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterMovie("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            filterMovie("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            filterMovie("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterMovie("Sci-Fi");
          }}
        >
          Sci-fi
        </Button>
      </Group>
      <Space h="20px" />
      <Grid>
        {movies
          ? movies.map((movie) => {
              return (
                <Grid.Col span={4} key={movie._id}>
                  <Card align="center" withBorder shadow="md" p="20px">
                    <Title order={5}>{movie.title}</Title>
                    <Space h="10px" />
                    <Divider />
                    <Space h="10px" />
                    <Group position="center" spacing={2}>
                      <Badge color="green">{movie.director}</Badge>
                      <Badge color="red">{movie.genre}</Badge>
                      <Badge>{movie.rating}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/movies/" + movie._id}
                        color="blue"
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          handleMovieDelete(movie._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}
export default Movies;
