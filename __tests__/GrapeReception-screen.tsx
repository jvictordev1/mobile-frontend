import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
}));

jest.mock("@/api/apiInstance", () => ({
  get: jest.fn(),
}));

jest.mock("expo-camera", () => ({
  useCameraPermissions: () => [
    { granted: true, canAskAgain: true },
    jest.fn(),
    jest.fn(),
  ],
  CameraView: () => null,
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const GrapeReception = require("@/app/(grapeReception)/index").default;

  return {
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    Stack: jest.fn(() => <GrapeReception />),
  };
});

const mockUpdateShipmentData = jest.fn();

describe("Add Shipment Functionality", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test("should render screen without breaking.", () => {
    renderRouter(
      { grapeReception: require("../app/(grapeReception)/index").default },
      {
        initialUrl: "/grapeReception",
      },
    );

    expect(screen).toBeTruthy();
  });

  // it("Should Allow Next Screen when form is completed", async () => {
  //   require("@/store/NewShipmentContext").useShipmentStore = () => ({
  //     shipmentData: {},
  //     updateShipmentData: mockUpdateShipmentData,
  //     setShipmentData: jest.fn(),
  //   });

  //   const mockPush = jest.fn();
  //   (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  //   renderRouter(
  //     {
  //       "/": require("@/app/(grapeReception)/_layout"),
  //       "/grapeReceptionP2": require("@/app/(grapeReception)/grapeReceptionP2"),
  //     },
  //     {
  //       initialUrl: "/",
  //     },
  //   );

  //   const user = userEvent.setup();
  //   const carrada = screen.getByPlaceholderText("3");
  //   const casta = screen.getByPlaceholderText("AIREN");
  //   const lote = screen.getByPlaceholderText("101");
  //   const caixas = screen.getByPlaceholderText("540");
  //   const peso = screen.getByPlaceholderText("1450");

  //   await waitFor(() => {
  //     expect(screen).toHavePathname("/");
  //   });

  //   await act(async () => {
  //     await user.type(carrada, "3");
  //     await user.type(casta, "AIREN");
  //     await user.type(lote, "101");
  //     await user.type(caixas, "540");
  //     await user.type(peso, "1450");
  //   });

  //   expect(carrada).toHaveDisplayValue("3");
  //   expect(casta).toHaveDisplayValue("AIREN");
  //   expect(lote).toHaveDisplayValue("101");
  //   expect(caixas).toHaveDisplayValue("540");
  //   expect(peso).toHaveDisplayValue("1450");

  //   const button = screen.getByTestId("nextButton");

  //   expect(button.props.accessibilityState.disabled).toBe(true);
  // });
});
