import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type Comic = {
    id : Nat;
    title : Text;
    author : Text;
    genre : Text;
    coverImage : Text; // Placeholder for image URL
    episodes : Nat;
    likes : Nat;
    description : Text;
  };

  let comicsMap = Map.empty<Nat, Comic>();

  let genresArray = [
    "Action",
    "Romance",
    "Drama",
    "Fantasy",
    "Comedy",
    "Horror",
    "Slice of Life",
  ];

  public query ({ caller }) func getComicById(id : Nat) : async ?Comic {
    comicsMap.get(id);
  };

  public query ({ caller }) func getAllComics() : async [Comic] {
    comicsMap.values().toArray();
  };

  public query ({ caller }) func getComicsByGenre(genre : Text) : async [Comic] {
    let filtered = comicsMap.values().filter(
      func(comic) {
        comic.genre == genre;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getAllGenres() : async [Text] {
    genresArray;
  };

  // Sample data initialization
  system func preupgrade() {};
  system func postupgrade() {
    comicsMap.add(
      1,
      {
        id = 1;
        title = "Superhero Adventures";
        author = "Jane Doe";
        genre = "Action";
        coverImage = "superhero.png";
        episodes = 10;
        likes = 1500;
        description = "Follow the journey of a new superhero saving the city!";
      },
    );

    comicsMap.add(
      2,
      {
        id = 2;
        title = "Love in Spring";
        author = "John Smith";
        genre = "Romance";
        coverImage = "loveinspring.png";
        episodes = 20;
        likes = 2300;
        description = "A heartwarming romance blossoming in the springtime.";
      },
    );

    comicsMap.add(
      3,
      {
        id = 3;
        title = "Mystic Realm";
        author = "Alice Wonderland";
        genre = "Fantasy";
        coverImage = "mysticrealm.png";
        episodes = 15;
        likes = 1800;
        description = "Journey into a world of magic and mythical creatures.";
      },
    );
  };
};
