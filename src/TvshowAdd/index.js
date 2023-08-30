import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function TvshowAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [premiereYear, setPremiereYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [seasons, setSeasons] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);

  const handleAddNewTvshow = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:2000/tvshows",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          title: title,
          creator: creator,
          premiere_year: premiereYear,
          end_year: endYear,
          seasons: seasons,
          genre: [genre],
          rating: rating,
        }),
      });
      // redirect back to home page
      notifications.show({
        title: "TvShow Added",
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
        Add New Tvshow
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={title}
          placeholder="Enter the tvshow title here"
          label="Title"
          description="The title of the Tvshow"
          withAsterisk
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={creator}
          placeholder="Enter the tvshow creator here"
          label="Creator"
          description="The creator of the tvshow"
          withAsterisk
          onChange={(event) => setCreator(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={premiereYear}
          placeholder="Enter the premiere year here"
          label="Premiere Year"
          description="The premiere year of the tvshow"
          withAsterisk
          onChange={setPremiereYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={endYear}
          placeholder="Enter the end year here"
          label="End Year"
          description="The end year of the tvshow"
          withAsterisk
          onChange={setEndYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={seasons}
          placeholder="Enter the season here"
          label="Seasons"
          description="The season of the tvshow"
          withAsterisk
          onChange={setSeasons}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={genre}
          placeholder="Enter the genre here"
          label="Genre"
          description="The genre of the tvshow"
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
          description="The rating of the tvshow"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewTvshow}>
          Add New Tvshow
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
export default TvshowAdd;
