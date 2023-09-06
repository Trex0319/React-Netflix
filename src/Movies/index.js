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
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Divider,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const fetchMovies = async (genre, rating) => {
  const response = await axios.get(
    "http://localhost:2000/movies" +
      (genre !== "" ? "?genre=" + genre : "") +
      (rating !== "" ? "&rating=" + rating : "")
  );
  return response.data; // movies data from express
};

const deleteMovie = async (movie_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:2000/movies/" + movie_id,
  });
  return response.data;
};

function Movies() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  // const [genreOptions, setGenreOptions] = useState([]);
  // 4. movies data will be updated depending on the genre selected
  const {
    isLoading,
    isError,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies", genre, rating], // 1. when genre changed
    queryFn: () => fetchMovies(genre, rating), // 2. call fetchMovies
  });

  // // extract genre from movies
  // useEffect(() => {
  //   let options = [];
  //   // loop through all the movies to get the genre from each movie
  //   if (movies && movies.length > 0) {
  //     movies.forEach((movie) => {
  //       // to make sure the genre wasn't already in the options
  //       if (!options.includes(movie.genre)) {
  //         options.push(movie.genre);
  //       }
  //     });
  //   }
  //   console.log(options);
  //   setGenreOptions(options);
  // }, [movies]);

  // extract genre from movies
  // useEffect(() => {
  //   // if genre is not empty, we are not going to update the options
  //   if (genre === "") {
  //     let options = [];
  //     // loop through all the movies to get the genre from each movie
  //     if (movies && movies.length > 0) {
  //       movies.forEach((movie) => {
  //         // to make sure the genre wasn't already in the options
  //         if (!options.includes(movie.genre)) {
  //           options.push(movie.genre);
  //         }
  //       });
  //     }
  //     setGenreOptions(options);
  //   }
  // }, [movies, genre]);

  // extract genre from movies using useMemo
  const memoryMovies = queryClient.getQueryData(["movies", "", ""]);
  const genreOptions = useMemo(() => {
    let options = [];
    // loop through all the movies to get the genre from each movie
    if (memoryMovies && memoryMovies.length > 0) {
      memoryMovies.forEach((movie) => {
        // to make sure the genre wasn't already in the options
        if (!options.includes(movie.genre)) {
          options.push(movie.genre);
        }
      });
    }
    return options;
  }, [memoryMovies]);

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      // this will be triggered when API is successfully executed
      // ask the react query to retrigger the API
      queryClient.invalidateQueries({
        queryKey: ["movies", genre],
      });
      // show movie is deleted message
      notifications.show({
        title: "Movie Deleted",
        color: "green",
      });
    },
  });
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:2000/movies")
  //     .then((response) => {
  //       setMovies(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  // const filterMovie = async (genre = "") => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:2000/movies?genre=" + genre
  //     );
  //     setMovies(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleMovieDelete = async (movie_id) => {
  //   try {
  //     await axios({
  //       method: "DELETE",
  //       url: "http://localhost:2000/movies/" + movie_id,
  //     });
  //     // show movie is delete message
  //     notifications.show({
  //       title: "Movie Deleted",
  //       color: "green",
  //     });
  //     // method 1 (modify the state) - filter out the deleted movie
  //     const newMovies = movies.filter((m) => m._id !== movie_id);
  //     // setMovies(newMovies);
  //     // method 2 (recall the api for movies again)
  //     // axios
  //     //   .get("https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies")
  //     //   .then((response) => {
  //     //     setMovies(response.data);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log(error);
  //     //   });
  //   } catch (error) {
  //     notifications.show({
  //       title: error.response.data.message,
  //       color: "red",
  //     });
  //   }
  // };

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
      <Group>
        <select
          value={genre}
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        >
          <option value="">All Genres</option>
          {genreOptions.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
        <select
          value={rating}
          onChange={(event) => {
            setRating(event.target.value);
          }}
        >
          <option value="">All Rating</option>
          <option value="1">1</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </Group>
      <Space h="20px" />
      <LoadingOverlay visible={isLoading} />
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
                          deleteMutation.mutate(movie._id);
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
