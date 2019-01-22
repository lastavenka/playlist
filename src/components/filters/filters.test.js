import Filters from "./filters";

describe("Filters", () => {
  const filters = [
    {
      id: "band",
      label: "исполнитель",
      items: []
    },
    {
      id: "song",
      label: "песня",
      items: []
    }
  ];

  describe("render", () => {
    it("renders empty form", () => {
      const component = renderer
        .create(<Filters onChange={() => {}} />)
        .toJSON();

      expect(component.type).toEqual("div");
      expect(component.props.className).toEqual("filters");
      expect(component.children[1].children).toBeNull();
    });

    it("renders filters' list", () => {
      const filters = [
        {
          id: "band",
          label: "исполнитель",
          items: []
        },
        {
          id: "song",
          label: "песня",
          items: []
        }
      ];
      const component = renderer
        .create(
          <Filters filters={filters} activeFilters={[]} onChange={() => {}} />
        )
        .toJSON();

      expect(component.type).toEqual("div");
      expect(component.props.className).toEqual("filters");
      expect(component.children[1].children.length).toEqual(2);
    });

    it("renders filters' list", () => {
      const component = renderer
        .create(<Filters filters={filters} onChange={() => {}} />)
        .toJSON();

      expect(component.type).toEqual("div");
      expect(component.props.className).toEqual("filters");
      expect(component.children[1].children.length).toEqual(2);
    });
  });

  describe("getFilters", () => {
    it("should return nothing if there are no filters in props", () => {
      const instance = shallow(<Filters onChange={() => {}} />).instance();
      expect(instance.getFilters()).toBeUndefined();
    });

    it("should return list of filters", () => {
      const instance = shallow(
        <Filters filters={filters} onChange={() => {}} />
      ).instance();
      expect(instance.getFilters()).toBeDefined();
    });
  });

  describe("getItems", () => {
    it("should return empty array", () => {
      const instance = shallow(<Filters onChange={() => {}} />).instance();
      expect(instance.getItems([])).toEqual([]);
    });

    it("should return filled array", () => {
      const items = ["a", "b", "c", "random"];
      const instance = shallow(<Filters onChange={() => {}} />).instance();
      expect(instance.getItems(items).length).toBeDefined();
    });
  });

  describe("getValue", () => {
    it('should return "все" if there are no active filters in props', () => {
      const instance = shallow(<Filters onChange={() => {}} />).instance();
      expect(instance.getValue("value")).toEqual("все");
    });

    it('should return "все" if current filter is inactive', () => {
      const filters = [{ id: "band", value: "Random" }];
      const instance = shallow(
        <Filters activeFilters={filters} onChange={() => {}} />
      ).instance();
      expect(instance.getValue("any")).toEqual("все");
    });

    it("should return value if current filter is active", () => {
      const filters = [{ id: "band", value: "Random" }];
      const instance = shallow(
        <Filters activeFilters={filters} onChange={() => {}} />
      ).instance();
      expect(instance.getValue("band")).toEqual("Random");
    });
  });
});
