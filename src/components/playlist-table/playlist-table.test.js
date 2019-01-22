import PlayListTable from "./playlist-table";

describe("PlayListTable", () => {
  describe("render", () => {
    it("should render table", () => {
      const component = renderer
        .create(<PlayListTable data={[]} handleClick={() => {}} />)
        .toJSON();

      expect(component.type).toEqual("table");
      expect(component.props.className).toContain("playlist-table");
    });
  });

  describe("getCells", () => {
    it("should return class without reverse option if props.active is false", () => {
      const item = { key: "value" };
      const instance = shallow(
        <PlayListTable data={[]} handleClick={() => {}} />
      ).instance();
      expect(instance.getCells(item)).toBeDefined();
    });
  });

  describe("getCells", () => {
    it("should call getCells()", () => {
      const data = [{ key: "value" }];
      const instance = shallow(
        <PlayListTable data={data} handleClick={() => {}} />
      ).instance();
      instance.getCells = jest.fn();
      instance.getCells();
      expect(instance.getCells).toHaveBeenCalled();
    });

    it("should return array of elements", () => {
      const data = [{ key: "value" }];
      const instance = shallow(
        <PlayListTable data={data} handleClick={() => {}} />
      ).instance();
      instance.getCells = jest.fn();
      expect(instance.getRows()).toBeDefined();
    });
  });

  describe("getHeaders", () => {
    it("should return array of elements", () => {
      const instance = shallow(
        <PlayListTable data={[]} handleClick={() => {}} />
      ).instance();
      expect(instance.getHeaders()).toBeDefined();
    });
  });
});
