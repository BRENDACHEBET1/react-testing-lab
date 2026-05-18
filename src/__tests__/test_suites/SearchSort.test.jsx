import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            date: "2019-12-01",
            description: "Coffee",
            category: "Food",
            amount: 5,
          },
        ]),
    })
  ));
});

test("search input triggers change event", async () => {
  render(<AccountContainer />);

  const searchInput = screen.getByPlaceholderText(
    "Search your Recent Transactions"
  );

  fireEvent.change(searchInput, { target: { value: "Coffee" } });

  expect(searchInput.value).toBe("Coffee");
});

test("sort dropdown triggers change event", async () => {
  render(<AccountContainer />);

  const select = screen.getByDisplayValue("Description");

  fireEvent.change(select, { target: { value: "category" } });

  expect(select.value).toBe("category");
});