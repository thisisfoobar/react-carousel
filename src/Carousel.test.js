import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title='images for testing' />
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

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title='images for testing' />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show again, not the third
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
});

it("hides the left arrow on first image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title='images for testing' />
  );

  // validate left arrow is hidden
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  // validate right arrow is in the doc
  expect(container.querySelector(".bi-arrow-right-circle")).toBeInTheDocument();
});

it("hides the right arrow on last image", function () {
  const lastIdx = TEST_IMAGES.length - 1;
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title='images for testing' />
  );

  // move forward in the carousel until the final image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  for (let i = 0; i < TEST_IMAGES.length; i++) {
    fireEvent.click(rightArrow);
  }

  // validate right arrow is hidden
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();

  // validate left arrow is in the doc
  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument();
});
