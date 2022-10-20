import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TrackPlayer from "./TrackPlayer";

const TEST_TRACK_URL: string =
  "https://p.scdn.co/mp3-preview/39e5fed2e8dadd277d1a914fc6d6399e05eb4f5d?cid=f5320cc39bfc4127b45d2c0441abea20";

describe("TrackPlayer Component", () => {
  test("Loads Audio Track Data Successfully", () => {
    // Arrange
    // Render track player
    render(<TrackPlayer trackURL={TEST_TRACK_URL} />);

    // Assert
    const audioEl: HTMLMediaElement = screen.getByTestId("audioElement");
    expect(audioEl.getAttribute("duration")).not.toBeNaN();
  });

  test("Plays Track Audio Successfully", () => {
    // Arrange
    // Render track player
    render(<TrackPlayer trackURL={TEST_TRACK_URL} />);

    // Act
    const playPauseBtn = screen.getByTestId("playPauseBtn");
    userEvent.click(playPauseBtn);

    // Assert
    setTimeout(() => {
      const audioEl: HTMLMediaElement = screen.getByTestId("audioElement");
      expect(audioEl.paused).toBeFalsy();
    }, 100);
  });

  test("Mutes Track Audio Successfully", async () => {
    // Arrange
    // Render track player
    render(<TrackPlayer trackURL={TEST_TRACK_URL} />);

    // Act
    const muteBtn = screen.getByTestId("muteBtn");
    await userEvent.click(muteBtn);

    // Assert
    const audioEl: HTMLMediaElement = screen.getByTestId("audioElement");
    expect(audioEl.muted).toBeTruthy();
  });
});
