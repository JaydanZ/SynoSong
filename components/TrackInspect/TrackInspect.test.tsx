import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../Store/store";
import { SessionProvider } from "next-auth/react";
import TrackInspect from "./TrackInspect";

//const mockStore = configureStore([]);

const TEST_SESSION = null;

const TEST_TRACK: SpotifyApi.TrackObjectFull[] = [
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
          url: "https://www.collinsdictionary.com/images/full/toast_102709511.jpg",
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Toast-3.jpg",
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/ToastedWhiteBread.jpg/800px-ToastedWhiteBread.jpg",
        },
      ],
      name: "Test Album",
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
];

describe("TrackInspect Component", () => {
  test("Renders TrackInspect Component", () => {
    // Arrange
    render(
      <SessionProvider session={TEST_SESSION}>
        <Provider store={store}>
          <TrackInspect
            trackData={TEST_TRACK[0]}
            imgPalette={[0]}
            artistTopTracks={TEST_TRACK}
          />
        </Provider>
      </SessionProvider>
    );

    // Assert
    expect(screen.getAllByText("John Test"));
    expect(screen.getAllByText("John's Test Track"));
    expect(screen.getAllByText("Test Album"));
  });
});
