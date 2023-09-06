import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";

const getMovie = async (id) => {
  const response = await axios.get("http://localhost:2000/movies/" + id);
  return response.data;
};

const updateMovie = async ({ id, data }) => {
  const response = await axios({
    method: "PUT",
    url: "http://localhost:2000/movies/" + id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

function MovieEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);
  const { isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    onSuccess: (data) => {
      setTitle(data.title);
      setDirector(data.director);
      setReleaseYear(data.release_year);
      setGenre(data.genre);
      setRating(data.rating);
    },
  });

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies/" + id
  //     )
  //     .then((response) => {
  //       // set value for every fields
  //       setTitle(response.data.title);
  //       setDirector(response.data.director);
  //       setReleaseYear(response.data.release_year);
  //       setGenre(response.data.genre);
  //       setRating(response.data.rating);
  //     })
  //     .catch((error) => {
  //       notifications.show({
  //         title: error.response.data.message,
  //         color: "red"
  //       });
  //     });
  // }, []);

  const updateMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      // show add success message
      notifications.show({
        title: "Movie Edited",
        color: "green",
      });
      // redirect back to home page
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUpdateMovie = async (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        title: title,
        director: director,
        release_year: releaseYear,
        genre: genre,
        rating: rating,
      }),
    });
    // try {
    //   await axios({
    //     method: "PUT",
    //     url:
    //       "https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies/" +
    //       id,
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     data: JSON.stringify({
    //       title: title,
    //       director: director,
    //       release_year: releaseYear,
    //       genre: genre,
    //       rating: rating
    //     })
    //   });
    //   // show add success message
    //   notifications.show({
    //     title: "Movie Edited",
    //     color: "green"
    //   });
    //   // redirect back to home page
    //   navigate("/");
    // } catch (error) {
    //   notifications.show({
    //     title: error.response.data.message,
    //     color: "red"
    //   });
    // }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Movie
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <LoadingOverlay visible={isLoading} />
        <TextInput
          value={title}
          placeholder="Enter the movie title here"
          label="Title"
          description="The title of the movie"
          withAsterisk
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={director}
          placeholder="Enter the movie director here"
          label="Director"
          description="The director of the movie"
          withAsterisk
          onChange={(event) => setDirector(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={releaseYear}
          placeholder="Enter the release year here"
          label="Release Year"
          description="The release year of the movie"
          withAsterisk
          onChange={setReleaseYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={genre}
          placeholder="Enter the genre here"
          label="Genre"
          description="The genre of the movie"
          withAsterisk
          onChange={(event) => setGenre(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={rating}
          placeholder="Enter the rating here"
          label="Rating"
          min={1}
          max={10}
          precision={1}
          step={0.5}
          description="The rating of the movie"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleUpdateMovie}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default MovieEdit;
