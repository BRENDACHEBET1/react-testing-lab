import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

test("displays transactions on startup", async () => {
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            description: "Paycheck from Bob's Burgers",
            date: "2019-12-01",
            category: "Income",
            amount: 1000,
          },
        ]),
    })
  ));

  render(<AccountContainer />);

  expect(
    await screen.findByText("Paycheck from Bob's Burgers")
  ).toBeInTheDocument();
});