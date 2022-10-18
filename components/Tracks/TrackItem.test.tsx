import { render, screen } from "@testing-library/react";
import TrackItem from "./TrackItem";

// Mock Track Data
const word: string = "test";
const trackName: string = "track-item-test-name";
const trackAlbumName: string = "track-tests";
const trackAlbumImage: string =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/ToastedWhiteBread.jpg/800px-ToastedWhiteBread.jpg";
const trackId: string = "track-item-test-1";
const artists: SpotifyApi.ArtistObjectSimplified[] = [
  {
    name: "John",
    id: "521",
    type: "artist",
    href: "test.test.com",
    external_urls: { spotify: "test" },
    uri: "track-test",
  },

  {
    name: "Steve",
    id: "127",
    type: "artist",
    href: "test.test.com",
    external_urls: { spotify: "test" },
    uri: "track-test2",
  },
];

// Transform next js formatted src string back into original src
const transformSource = (src: string, originalSrc: string) => {
  // Remove next js src format
  let tempString: string = src.replace("/_next/image?url=", "");
  tempString = tempString.replace("%3A", ":");
  tempString = tempString.replace(/%2F/g, "/");

  if (originalSrc.length < tempString.length) {
    tempString = tempString.slice(0, originalSrc.length);
  }
  return tempString;
};

describe("TrackItem Component", () => {
  test("Renders track name prop", () => {
    // Arrange
    // Render track item
    render(
      <TrackItem
        word={word}
        trackName={trackName}
        trackArtists={artists}
        trackAlbumName={trackAlbumName}
        trackAlbumImage={trackAlbumImage}
        trackID={trackId}
      />
    );

    // Assert
    const nameElement = screen.getByText("track-item-test-name");
    expect(nameElement).toBeInTheDocument();
  });

  test("Renders artists prop", () => {
    // Arrange
    // Render track item
    render(
      <TrackItem
        word={word}
        trackName={trackName}
        trackArtists={artists}
        trackAlbumName={trackAlbumName}
        trackAlbumImage={trackAlbumImage}
        trackID={trackId}
      />
    );

    // Assert
    const artistsNames = screen.getByText("John, steve", { exact: false });
    expect(artistsNames).toBeInTheDocument();
  });

  test("Renders album name prop", () => {
    // Arrange
    // Render track item
    render(
      <TrackItem
        word={word}
        trackName={trackName}
        trackArtists={artists}
        trackAlbumName={trackAlbumName}
        trackAlbumImage={trackAlbumImage}
        trackID={trackId}
      />
    );

    // Assert
    const albumName = screen.getByText("track-tests");
    expect(albumName).toBeInTheDocument();
  });

  test("Renders image with trackAlbumImage prop as src", () => {
    // Arrange
    // Render track item
    render(
      <TrackItem
        word={word}
        trackName={trackName}
        trackArtists={artists}
        trackAlbumName={trackAlbumName}
        trackAlbumImage={trackAlbumImage}
        trackID={trackId}
      />
    );

    // Assert
    const img = screen.getByAltText(trackName);
    expect(transformSource(img.getAttribute("src")!, trackAlbumImage)).toEqual(
      trackAlbumImage
    );
  });
});
