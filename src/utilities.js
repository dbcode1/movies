const bearer = import.meta.env.VITE_API_BEARER_KEY;
export const caller = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };
  try {
    const data = await fetch(url, options);
    const json = await data.json();

    return json;
  } catch (err) {
    console.log("ERROR FETCHING DATA", err);
  }
};

export const movieObject = async (item, resultObjs) => {
  if (item == "undefined") {
    return;
  }

  const obj = {
    title: item.original_title,
    overview: item.overview,
    id: item.id,
    img: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    clip: await preview(item.id),
  };

  return obj;
};

export const preview = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const previewData = await caller(url);

  // get only official trailers
  const key = previewData.results
    .map((item) => {
      const trailer = "trailer";

      if (
        item !== undefined &&
        item.name.toLowerCase().includes(trailer.toLowerCase())
      ) {
        return item.key;
      }
    })
    .filter((value) => value !== undefined);
  return key[0];
};

const urlList = () => {
  let urls = [];
  for (let i = 1; i <= 8; i++) {
    // if (i > 3) {
    //   setTimeout(() => {}, 1000);
    // }
    const url = `https://api.themoviedb.org/3/discover/movie?&certification_country=US&language=en-US&popularity.gte=100&vote_average.gte=7&vote_count.gte=1000&page=${i}`;
    // const result = await caller(url);
    // data.push(...result.results)
    urls.push(url);
  }
  return urls;
};

// TODO: pagination button which triggers a new request each click

/*
keep track of page number
call with page number
update state without causing huge rerender glitches
*/

const genreUrls = (id) => {
  console.log(id);
  let urls = [];
  //setSearchKey((prevKey) => prevKey + 1);
  // get page urls
  for (let i = 1; i <= 5; i++) {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${i}`;
    urls.push(url);
  }
  return urls;
};

export const dataFormatter = async (id) => {
  let data = [];
  let requests;
  !id
    ? (requests = urlList().map((url) => caller(url)))
    : (requests = genreUrls(id).map((url) => caller(url)));
  try {
    const responses = await Promise.all(requests);
    responses.map((item) => {
      data.push(item.results);
    });
  } catch {
    console.log("Error fetching data");
  }

  const flatData = data.flat();
  const movieObjs = flatData.map(async (item) => {
    const result = await movieObject(item);
    return result;
  });

  const m = await Promise.all(movieObjs);

  const unique = m.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return unique;
};
