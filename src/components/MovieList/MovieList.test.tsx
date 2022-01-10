import { render } from "@testing-library/react";
import { mockListMovies } from "../../mocks/api";
import MovieList from "./index";

test("Renders content MovieList and MovieCard", () => {
    const component = render(<MovieList movies={mockListMovies} />);
    expect(component.container).toHaveTextContent(mockListMovies[0].original_title);
});