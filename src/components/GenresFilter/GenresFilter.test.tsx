import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { genresMock } from "../../mocks/api";
import GenresFilter from "./index";

test("Test click on item from filter", () => {

    const mockHandler = jest.fn();

    const component = render(<GenresFilter genres={genresMock} handleChangeSelectedFilter={mockHandler} />);

    const buttonFilter = component.getByTestId(`genre-${genresMock[0].id}`)

    fireEvent.click(buttonFilter);

    expect(mockHandler).toHaveBeenCalledTimes(1);
});