import SortControls from "./sort-controls";

describe("SortControls", () => {
  describe("render", () => {
    it("should render button", () => {
      const component = renderer
        .create(<SortControls handleClick={() => {}} />)
        .toJSON();

      expect(component.type).toEqual("button");
      expect(component.props.className).toEqual("sort-controls");
    });
  });

  describe("defineClass", () => {
    it("should return class without reverse option if props.active is false", () => {
      const instance = shallow(
        <SortControls active={false} handleClick={() => {}} />
      ).instance();
      expect(instance.defineClass()).toEqual("sort-controls");
    });

    it("should return class with reverse option if props.active is true", () => {
      const instance = shallow(
        <SortControls active={true} reverse={true} handleClick={() => {}} />
      ).instance();
      expect(instance.defineClass()).toEqual(
        "sort-controls sort-controls_direction_up"
      );
    });
  });
});
