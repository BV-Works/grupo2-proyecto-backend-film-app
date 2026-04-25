const FavoritesAPI = {
    async getAll() {
      const res = await fetch("/api/favorites");
      return await res.json();
    },
  
    async add(movieSource, movieSourceId) {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieSource,
          movieSourceId,
        }),
      });
  
      return await res.json();
    },
  
    async remove(favoriteId) {
      const res = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
      });
      console.log(favoriteId); 
  
      return await res.json();
    },
  
    findFavorite(favorites, movieSource, movieSourceId) {
      return favorites.find(
        (fav) =>
          fav.movieSource === movieSource &&
          fav.movieSourceId === movieSourceId
      );
    },
  };