import AboutScreen from "@/app_/(tabs)/about";
import { render } from "@testing-library/react-native";

describe("<AboutScreen />", () => {
  test("Text renders correctly on AboutScreen", () => {
    const { getByText } = render(<AboutScreen />);

    expect(getByText("About screen")).toBeTruthy();
  });
  test("Screenshot", () => {
    const tree = render(<AboutScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
