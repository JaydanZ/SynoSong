import { render, screen } from "@testing-library/react";
import type { trackListObj } from "../../types/types";
import TrackList from "./TrackList";

const TEST_TRACK_LIST: trackListObj = [
  {
    key: "Test Track List",
    tracks: [
      {
        album: {
          uri: "",
          album_type: "single",
          artists: [
            {
              name: "John Test",
              id: "213ew3211dvf32",
              type: "artist",
              href: "",
              external_urls: {
                spotify: "",
              },
              uri: "",
            },
          ],
          external_urls: { spotify: "" },
          href: "",
          id: "",
          images: [
            {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/ToastedWhiteBread.jpg/800px-ToastedWhiteBread.jpg",
            },
          ],
          name: "Test Track",
          release_date: "",
          release_date_precision: "day",
          total_tracks: 1,
          type: "album",
        },
        artists: [
          {
            name: "John Test",
            id: "213ew3211dvf32",
            type: "artist",
            href: "",
            external_urls: {
              spotify: "",
            },
            uri: "",
          },
        ],
        disc_number: 1,
        duration_ms: 343121,
        explicit: false,
        external_ids: { isrc: "" },
        external_urls: { spotify: "" },
        href: "",
        id: "37u4hgj8232bs",
        is_local: false,
        is_playable: true,
        name: "John's Test Track",
        popularity: 20,
        preview_url: "",
        track_number: 1,
        type: "track",
        uri: "",
      },
    ],
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

describe("TrackList Component", () => {
  test("Renders a TrackList with provided props", () => {
    // Arrange
    render(<TrackList tracks={TEST_TRACK_LIST} />);

    // Assert
    const imgSrc = TEST_TRACK_LIST[0].tracks[0].album.images[0].url;
    const trackName = TEST_TRACK_LIST[0].tracks[0].name;
    const artistName = TEST_TRACK_LIST[0].tracks[0].artists[0].name;
    const albumName = TEST_TRACK_LIST[0].tracks[0].album.name;

    const img = screen.getByAltText(trackName);

    expect(transformSource(img.getAttribute("src")!, imgSrc)).toEqual(imgSrc);
    expect(screen.getByText(trackName)).toBeInTheDocument();
    expect(screen.getByText(artistName)).toBeInTheDocument();
    expect(screen.getByText(albumName)).toBeInTheDocument();
  });
});
