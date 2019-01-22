import ControlsSet from "./controls-set";

describe("ControlsSet", () => {
  it("should render empty list", () => {
    const component = renderer
      .create(<ControlsSet items={[]} handleClick={() => {}} />)
      .toJSON();

    expect(component.type).toEqual("ul");
    expect(component.props.className).toEqual("controls-set");
    expect(component.children).toBeNull();
  });

  it("should render list with items", () => {
    const component = renderer
      .create(<ControlsSet items={[10, 20, 30]} handleClick={() => {}} />)
      .toJSON();

    expect(component.type).toEqual("ul");
    expect(component.props.className).toEqual("controls-set");
    expect(component.children.length).toEqual(3);
  });
});
