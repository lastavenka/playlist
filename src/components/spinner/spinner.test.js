import Spinner from "./spinner";

describe("Spinner", () => {
  it("should render spinner", () => {
    const component = renderer.create(<Spinner text={"hi"} />).toJSON();

    expect(component.type).toEqual("span");
    expect(component.props.className).toEqual("spinner");
    expect(component.children[0]).toEqual("hi");
  });
});
