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
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function MovieEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:2000/movies/" + id)
      .then((response) => {
        // set value for every fields
        setTitle(response.data.title);
        setDirector(response.data.director);
        setReleaseYear(response.data.release_year);
        setGenre(response.data.genre);
        setRating(response.data.rating);
      })
      .catch((error) => {
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleAddNewMovie = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:2000/movies/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          title: title,
          director: director,
          release_year: releaseYear,
          genre: genre,
          rating: rating,
        }),
      });
      // show add success message
      notifications.show({
        title: "Movie Updated",
        color: "green",
      });
      // redirect back to home page
      navigate("/");
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Movie
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
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
          description="The rating of the movie"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewMovie}>
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
