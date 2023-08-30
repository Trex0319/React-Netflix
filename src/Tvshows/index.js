// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";

// function Tvshows() {
//   const [tvshows, setTvshows] = useState([]);
//   const [tvshowAPI, setTvshowAPI] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/tvshows")
//       .then((response) => {
//         setTvshows(response.data);
//         setTvshowAPI(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const filterTvshow = async (genre) => {
//     if (genre !== "") {
//       const newTvshow = tvshowAPI.filter((tv) => tv.genre.includes(genre));
//       setTvshows(newTvshow);
//     } else {
//       setTvshows(tvshowAPI);
//     }
//   };

//   return (
//     <>
//       <Title order={3} align="center">
//         Tv Shows
//       </Title>
//       <Space h="20px" />
//       <Group>
//         <Button
//           onClick={() => {
//             filterTvshow("");
//           }}
//         >
//           All
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Drama");
//           }}
//         >
//           Drama
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Fantasy");
//           }}
//         >
//           Fantasy
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Action");
//           }}
//         >
//           Action
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Sci-Fi");
//           }}
//         >
//           Sci-fi
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Adventure");
//           }}
//         >
//           Adventure
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Comedy");
//           }}
//         >
//           Comedy
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Thriller");
//           }}
//         >
//           Thriller
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Horror");
//           }}
//         >
//           Horror
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Crime");
//           }}
//         >
//           Crime
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Mystery");
//           }}
//         >
//           Mystery
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("Biography");
//           }}
//         >
//           Biography
//         </Button>
//         <Button
//           onClick={() => {
//             filterTvshow("History");
//           }}
//         >
//           History
//         </Button>
//       </Group>
//       <Space h="20px" />
//       <Grid>
//         {tvshows
//           ? tvshows.map((tvshow) => {
//               return (
//                 <Grid.Col key={tvshow._id} span={4}>
//                   <Card withBorder shadow="sm" p="20px">
//                     <Title order={5}>{tvshow.title}</Title>
//                     <Space h="20px" />
//                     <Group position="center" sapcing="5px">
//                       <Badge color="green">{tvshow.creator}</Badge>
//                       {tvshow.genre.map((genre) => (
//                         <Badge color="yellow" key={genre}>
//                           {genre}
//                         </Badge>
//                       ))}
//                       <Badge color="red">{tvshow.rating}</Badge>
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

// export default Tvshows;

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
function Tvshow() {
  const navigate = useNavigate();
  const [tvshows, setTvshow] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2000/tvshows")
      .then((response) => {
        setTvshow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filterTvshow = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:2000/tvshows?genre=" + genre
      );
      setTvshow(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTvshowDelete = async (tvshow_id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:2000/tvshows/" + tvshow_id,
      });
      // show movie is delete message
      notifications.show({
        title: "Tvshow Deleted",
        color: "green",
      });
      // method 1 (modify the state) - filter out the deleted movie
      const newTvshows = tvshows.filter((t) => t._id !== tvshow_id);
      setTvshow(newTvshows);
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
          Tvshows
        </Title>
        {/* <Button component={Link} to="/movie_add" color="green">
          Add New
        </Button> */}
        <Button
          color="green"
          onClick={() => {
            navigate("/tvshow_add");
          }}
        >
          Add New
        </Button>{" "}
      </Group>
      <Space h="20px" />
      <Title order={3} align="center">
        TV Shows
      </Title>
      <Space h="20px" />
      <Group position="center">
        <Button
          onClick={() => {
            filterTvshow("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Crime");
          }}
        >
          Crime
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Adventure");
          }}
        >
          Adventure
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Biography");
          }}
        >
          Biography
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Horror");
          }}
        >
          Horror
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Sci-Fi");
          }}
        >
          Sci-Fi
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Comedy");
          }}
        >
          Comedy
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Mystery");
          }}
        >
          Mystery
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Thriller");
          }}
        >
          Thriller
        </Button>
      </Group>
      <Space h="20px" />
      <Grid>
        {tvshows
          ? tvshows.map((tvshow) => {
              return (
                <Grid.Col span={4} key={tvshow._id}>
                  <Card align="center" withBorder shadow="md" p="20px">
                    <Title order={5}>{tvshow.title}</Title>
                    <Space h="10px" />
                    <Divider />
                    <Space h="10px" />
                    <Group position="center" spacing={2}>
                      <Badge color="green">{tvshow.creator}</Badge>
                      {tvshow.genre.map((genre) => (
                        <Badge color="red" key={tvshow.genre}>
                          {genre}
                        </Badge>
                      ))}
                      <Badge>{tvshow.rating}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/tvshows/" + tvshow._id}
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
                          handleTvshowDelete(tvshow._id);
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
export default Tvshow;
