import PlayList from "./playlist";

describe("PlayList", () => {
  describe("render", () => {
    it("should render table", () => {
      const component = renderer.create(<PlayList />).toJSON();

      expect(component.type).toEqual("section");
      expect(component.props.className).toContain("playlist");
    });
  });

  describe("componentDidMount", () => {
    it("should call getPlaylistData()", () => {
      const instance = shallow(<PlayList />).instance();
      instance.getPlaylistData = jest.fn();
      instance.componentDidMount();
      expect(instance.getPlaylistData).toHaveBeenCalled();
    });
  });

  describe("getPlaylistData", () => {
    it("should call handleResponse() if promise resolved", async () => {
      const instance = shallow(<PlayList />).instance();
      instance.handleResponse = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve("response");
        });
      });
      await instance.getPlaylistData();
      expect(instance.handleResponse).toHaveBeenCalledWith("response");
    });

    it("should not call handleResponse() if promise rejected", async () => {
      const instance = shallow(<PlayList />).instance();
      instance.handleResponse = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject();
        });
      });
      await instance.getPlaylistData();
      expect(instance.handleResponse).not.toHaveBeenCalled();
    });

    it("should not call setError() if promise rejected", async () => {
      const instance = shallow(<PlayList />).instance();
      instance.setError = jest.fn();
      instance.generateData = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject();
        });
      });
      await instance.getPlaylistData();
      expect(await instance.setError).toHaveBeenCalledWith(
        "Что-то пошло не так. Пожалуйста, попробуйте позже"
      );
    });
  });

  describe("handleResponse", () => {
    it("should set data in state if status is 200", async () => {
      const data = [{ key: "value" }];
      const res = {
        status: 200,
        json: jest
          .fn()
          .mockImplementation(
            () => new Promise((resolve, reject) => resolve(data))
          )
      };
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data: [] });
      await instance.handleResponse(res);
      expect(instance.state.data).toEqual(data);
    });

    it("should not set data in state if status is not 200", () => {
      const data = [{ key: "value" }];
      const res = {
        status: 300
      };
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data: [] });
      instance.handleResponse(res);
      expect(instance.state.data).toEqual([]);
    });

    it("should call setError() if status is not 200", () => {
      const data = [{ key: "value" }];
      const res = {
        status: 300
      };
      const instance = shallow(<PlayList />).instance();
      instance.setError = jest.fn();
      instance.handleResponse(res);
      expect(instance.setError).toHaveBeenCalledWith(
        "Что-то пошло не так. Пожалуйста, попробуйте позже"
      );
    });
  });

  describe("handleResponse", () => {
    it("should set error in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ error: "" });
      instance.setError("random");
      expect(instance.state.error).toEqual("random");
    });

    it("should set empty error in state if error is not passed", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ error: "string" });
      instance.setError();
      expect(instance.state.error).toEqual("");
    });
  });

  describe("showError", () => {
    it("should return error if it exists in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ error: "error" });
      expect(instance.showError()).toBeDefined();
    });

    it("should not return error if it does not exist in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ error: "" });
      expect(instance.showError()).toBeUndefined();
    });
  });

  describe("showSpinner", () => {
    it("should return spinner if loading is true", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ loading: true });
      expect(instance.showSpinner()).toBeDefined();
    });

    it("should not return spinner if loading is false", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ loading: false });
      expect(instance.showSpinner()).toBeUndefined();
    });
  });

  describe("decorateTableData", () => {
    const data = [
      {
        genre: "needs-based",
        song: "Producer",
        year: 1995
      }
    ];

    it("should call sortData", () => {
      const instance = shallow(<PlayList />).instance();
      instance.sortData = jest.fn();
      instance.sliceData = jest.fn();
      instance.decorateTableData(data);
      expect(instance.sortData).toHaveBeenCalledWith(data);
    });

    it("should call sliceData", () => {
      const instance = shallow(<PlayList />).instance();
      instance.sortData = jest.fn();
      instance.sliceData = jest.fn();
      instance.decorateTableData(data);
      expect(instance.sliceData).toHaveBeenCalled();
    });
  });

  describe("getFilters", () => {
    const data = [
      {
        genre: "needs-based",
        band: "Producer",
        year: 1995,
        song: "66"
      },
      {
        genre: "random",
        band: "Person",
        year: 2000,
        song: "song"
      },
      {
        genre: "needs-based",
        band: "Another",
        year: 2000,
        song: "qwerty"
      }
    ];
    const filtersList = [
      {
        id: "band",
        items: ["все", "Another", "Person", "Producer"],
        label: "Исполнитель"
      },
      { id: "genre", items: ["все", "needs-based", "random"], label: "Жанр" },
      { id: "year", items: ["все", 1995, 2000], label: "Год" }
    ];

    it("should return array with sorted lists of unique filters, labels and ids", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data: data });
      expect(instance.getFilters()).toEqual(filtersList);
    });
  });

  describe("filterData", () => {
    const data = [
      {
        genre: "needs-based",
        band: "Producer",
        year: 1995,
        song: "66"
      },
      {
        genre: "random",
        band: "Person",
        year: 2000,
        song: "song"
      },
      {
        genre: "needs-based",
        band: "Another",
        year: 2000,
        song: "qwerty"
      }
    ];

    const filteredData = [
      {
        genre: "needs-based",
        band: "Another",
        year: 2000,
        song: "qwerty"
      },
      {
        genre: "needs-based",
        band: "Producer",
        year: 1995,
        song: "66"
      }
    ];

    it("should return all data if there are no active filters in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data: data });
      expect(instance.filterData()).toEqual(data);
    });

    it("should return filtered data if there are active filters in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({
        data: data,
        activeFilters: [{ id: "genre", value: "needs-based" }]
      });
      expect(instance.filterData()).toEqual(filteredData);
    });
  });

  describe("sortData", () => {
    const data = [
      {
        genre: "needs-based",
        band: "Producer",
        year: 1995,
        song: "66"
      },
      {
        genre: "random",
        band: "Person",
        year: 2000,
        song: "song"
      },
      {
        genre: "needs-based",
        band: "Another",
        year: 1999,
        song: "qwerty"
      }
    ];

    it("should sort by year in straight order", () => {
      const sortedByYear = [
        {
          genre: "random",
          band: "Person",
          year: 2000,
          song: "song"
        },
        {
          genre: "needs-based",
          band: "Another",
          year: 1999,
          song: "qwerty"
        },
        {
          genre: "needs-based",
          band: "Producer",
          year: 1995,
          song: "66"
        }
      ];
      const instance = shallow(<PlayList />).instance();
      instance.setState({ sortBy: "year" });
      expect(instance.sortData(data)).toEqual(sortedByYear);
    });

    it("should sort by year in reverse order", () => {
      const sortedByYearReverse = [
        {
          genre: "needs-based",
          band: "Producer",
          year: 1995,
          song: "66"
        },
        {
          genre: "needs-based",
          band: "Another",
          year: 1999,
          song: "qwerty"
        },
        {
          genre: "random",
          band: "Person",
          year: 2000,
          song: "song"
        }
      ];
      const instance = shallow(<PlayList />).instance();
      instance.setState({ sortBy: "year", reverse: true });
      expect(instance.sortData(data)).toEqual(sortedByYearReverse);
    });

    it("should sort by band in straight order", () => {
      const sortedByBand = [
        {
          genre: "needs-based",
          band: "Another",
          year: 1999,
          song: "qwerty"
        },
        {
          genre: "random",
          band: "Person",
          year: 2000,
          song: "song"
        },
        {
          genre: "needs-based",
          band: "Producer",
          year: 1995,
          song: "66"
        }
      ];
      const instance = shallow(<PlayList />).instance();
      instance.setState({ sortBy: "band" });
      expect(instance.sortData(data)).toEqual(sortedByBand);
    });

    it("should sort by band in reverse order", () => {
      const sortedByBandReverse = [
        {
          genre: "needs-based",
          band: "Producer",
          year: 1995,
          song: "66"
        },
        {
          genre: "random",
          band: "Person",
          year: 2000,
          song: "song"
        },
        {
          genre: "needs-based",
          band: "Another",
          year: 1999,
          song: "qwerty"
        }
      ];
      const instance = shallow(<PlayList />).instance();
      instance.setState({ sortBy: "band", reverse: true });
      expect(instance.sortData(data)).toEqual(sortedByBandReverse);
    });
  });

  describe("sliceData", async () => {
    const data = [
      {
        genre: "needs-based",
        band: "Another",
        year: 1999,
        song: "qwerty"
      },
      {
        genre: "random",
        band: "Person",
        year: 2000,
        song: "song"
      },
      {
        genre: "needs-based",
        band: "Producer",
        year: 1995,
        song: "66"
      }
    ];

    it("should return sliced data", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ rows: 2 });
      expect(instance.sliceData(data).length).toEqual(2);
    });
  });

  describe("showContent", () => {
    it("should return if there is no data in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data: [] });
      expect(instance.showContent()).toBeUndefined();
    });

    it("should return content", () => {
      const data = [
        {
          genre: "needs-based",
          song: "Producer",
          year: 1995
        }
      ];
      const instance = shallow(<PlayList />).instance();
      instance.setState({ data });
      expect(instance.showContent()).toBeDefined();
    });
  });

  describe("showTable", () => {
    it("should return message if there is no data for table", () => {
      const instance = shallow(<PlayList />).instance();
      expect(instance.showTable([]).type).toBe("span");
    });

    it("should return table with controls", () => {
      const data = [
        {
          genre: "needs-based",
          song: "Producer",
          year: 1995
        }
      ];

      const instance = shallow(<PlayList />).instance();
      expect(instance.showTable(data)).toBeDefined();
    });
  });

  describe("changeSorting", () => {
    it("should call toggleSortDirection() if sortBy is equal to state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.toggleSortDirection = jest.fn();
      instance.setState({ sortBy: "band" });
      instance.changeSorting("band");
      expect(instance.toggleSortDirection).toHaveBeenCalled();
    });

    it("should not call toggleSortDirection() if sortBy is equal to state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.toggleSortDirection = jest.fn();
      instance.setState({ sortBy: "band" });
      instance.changeSorting("another");
      expect(instance.toggleSortDirection).not.toHaveBeenCalled();
    });

    it("should set sortBy in state, reverse to false", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ sortBy: "", reverse: true });
      instance.changeSorting("song");
      expect(instance.state.sortBy).toBe("song");
      expect(instance.state.reverse).toBe(false);
    });
  });

  describe("changePage", () => {
    it("should set page in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ currentPage: 1 });
      instance.changePage({ selected: 10 });
      expect(instance.state.currentPage).toBe(11);
    });
  });

  describe("changeRowsCount", () => {
    it("should return if rows value os equal to state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ rows: 100 });
      expect(instance.changeRowsCount(100)).toBeUndefined();
    });

    it("should set rows in state, currentPage to 1", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ currentPage: 10, rows: 50 });
      instance.changeRowsCount(10);
      expect(instance.state.rows).toBe(10);
      expect(instance.state.currentPage).toBe(1);
    });
  });

  describe("toggleSortDirection", () => {
    it("should toggle reverse", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ reverse: true });
      instance.toggleSortDirection();
      expect(instance.state.reverse).toBe(false);
    });

    it("should toggle reverse", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ reverse: false });
      instance.toggleSortDirection();
      expect(instance.state.reverse).toBe(true);
    });
  });

  describe("changeFilter", () => {
    it("should set filter in state if it does not exist in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ activeFilters: [] });
      instance.changeFilter("band", "random");
      expect(instance.state.activeFilters.length).toBe(1);
      expect(instance.state.activeFilters[0].value).toBe("random");
    });

    it("should delete filter from state if value is 'все'", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ activeFilters: [{ id: "band", value: "random" }] });
      instance.changeFilter("band", "все");
      expect(instance.state.activeFilters.length).toBe(0);
    });

    it("should change filter in state", () => {
      const instance = shallow(<PlayList />).instance();
      instance.setState({ activeFilters: [{ id: "band", value: "random" }] });
      instance.changeFilter("band", "another");
      expect(instance.state.activeFilters.length).toBe(1);
      expect(instance.state.activeFilters[0].value).toBe("another");
    });
  });
});
