import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { vi } from "vitest";

test("adds transaction to frontend", async () => {
  vi.stubGlobal("fetch", vi.fn());

  
  fetch.mockResolvedValueOnce({
    json: () =>
      Promise.resolve([
        {
          id: "1",
          date: "2019-12-01",
          description: "Existing Transaction",
          category: "Food",
          amount: 10,
        },
      ]),
  });

  
  fetch.mockResolvedValueOnce({
    json: () =>
      Promise.resolve({
        id: "2",
        date: "2019-12-02",
        description: "New Transaction",
        category: "Food",
        amount: 20,
      }),
  });

  render(<AccountContainer />);

  
  expect(await screen.findByText("Existing Transaction")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { value: "New Transaction" },
  });

  fireEvent.change(screen.getByPlaceholderText("Category"), {
    target: { value: "Food" },
  });

  fireEvent.change(screen.getByPlaceholderText("Amount"), {
    target: { value: "20" },
  });

  fireEvent.click(screen.getByText("Add Transaction"));

  expect(await screen.findByText("New Transaction")).toBeInTheDocument();
});