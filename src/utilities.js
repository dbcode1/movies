import { useQuery } from "@tanstack/react-query";

const bearer = import.meta.env.VITE_API_BEARER_KEY;
// export const caller = async (url) => {
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${bearer}`,
//     },
//   };
//   try {
//     const data = await fetch(url, options);
//     const json = await data.json();

//     return json;
//   } catch (err) {
//     console.log("ERROR FETCHING DATA", err);
//   }
// };

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

export const movieObject = async (item) => {
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

const urlList = (pageNumber) => {
  console.log("pageNumber", pageNumber);
  let urls = [];
  for (let i = 1; i <= 2; i++) {
    // if (i > 3) {
    //   setTimeout(() => {}, 1000);
    // }
    const url = `https://api.themoviedb.org/3/discover/movie?&certification_country=US&language=en-US&popularity.gte=100&vote_average.gte=7&vote_count.gte=1000&page=${pageNumber}`;
    urls.push(url);
    console.log(url);
  }
  return urls;
};

const genreUrls = (id, pageNumber) => {
  let urls = [];
  for (let i = 1; i <= 2; i++) {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${pageNumber}`;
    urls.push(url);
    console.log(url);
  }
  return urls;
};

export const getPopularTotal = async (pageNumber) => {
  console.log("NUMBER", pageNumber)
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };
  const resp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${pageNumber}`,
    options
  );
  const result = await resp.json();
  console.log("RESULT", result);
  return result.total_pages;
};


export const getTotal = async (id, pageNumber) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };
  const resp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${pageNumber}`,
    options
  );
  const result = await resp.json();
  console.log("RESULT", result);
  return result.total_pages;
};

export const dataFormatter = async (id, pageNumber) => {
  let data = [];
  let requests;
  !id
    ? (requests = urlList(pageNumber).map((url) => caller(url)))
    : (requests = genreUrls(id, pageNumber).map((url) => caller(url)));

  try {
    const responses = await Promise.all(requests);
    console.log(responses);
    responses.map((item) => {
      data.push(item.results);
    });
  } catch (error){
    console.log("Error fetching data");
  }

  const flatData = data.flat();
  const movieObjs = flatData.map(async (item) => {
    const result = await movieObject(item);
    return result;
  });

  const m = await Promise.all(movieObjs);

  const unique = m.filter(
    (user, index, self) =>
      index === self.findIndex((u) => u.title === user.title)
  );

  return unique;
};
