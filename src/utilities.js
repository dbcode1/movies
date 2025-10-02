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
  const key = previewData.results.map((item) => {
    const trailer = "trailer";

    if (item !== undefined && item.name.toLowerCase().includes(trailer.toLowerCase())) {
      return item.key
    }
  }).filter(value => value !== undefined)
return key[0]
};
