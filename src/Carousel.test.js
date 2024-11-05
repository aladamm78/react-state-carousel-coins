import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test for Carousel component
it("renders Carousel component without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// Test for clicking on the right arrow
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Test for clicking on the left arrow
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move forward to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to be shown
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // Move back to the first image by clicking the left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to be shown again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

// Test for hiding arrows on the first and last images
it("hides left arrow on the first image and right arrow on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Check that the left arrow is missing on the first image
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(leftArrow).toBeNull();
  expect(rightArrow).toBeInTheDocument();

  // Move to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Re-query the DOM for updated elements
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Check that the right arrow is missing on the last image
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeNull();
});
