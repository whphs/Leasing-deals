import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Vehicle from "../components/Vehicle";
import { Spinner } from "react-bootstrap";

import Filter from "../components/Filter";
// import PaginationTag from "react-bootstrap/Pagination";
import { InputGroup, FormControl } from "react-bootstrap";

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsToShow: [],
      totalItems: [],
      filteredItems: [],
      activePage: 1,
      itemsCountPerPage: 20,
      pageRangeDisplayed: 5,
      loading: false,
      rentalRange: 2000,
      filter: null,
      keyword: ""
    };
  }

  componentDidMount() {
    this.pullData("personal");
  }

  iniVariablesWithDeals = deals => {
    let transmissions = [];
    let engineTypes = [];

    for (let i = 0; i < deals.length; i++) {
      let item = deals[i];
      if (!transmissions.includes(item.transmission)) {
        transmissions.push(item.transmission);
      }
      if (!engineTypes.includes(item.engine_type)) {
        engineTypes.push(item.engine_type);
      }
    }

    this.setState({
      loading: false,
      transmissionList: transmissions,
      engineTypeList: engineTypes,
      totalItems: deals,
      filteredItems: deals,
      itemsToShow: deals.slice(0, this.state.itemsCountPerPage)
    });
  };

  pullData = type => {
    this.setState({
      itemsToShow: [],
      filteredItems: [],
      totalItems: [],
      activePage: 1,
      loading: true
    });

    axios
      .post(process.env.REACT_APP_API_BASE_URL, {
        type: type,
        modelID: "x2 xdrive18 suv"
      })
      .then(res => {
        this.iniVariablesWithDeals(res.data.deals);
      });
  };

  handleTypeChange = type => {
    this.pullData(type);
  };

  handlePageChange = pageNumber => {
    let startIndex = (pageNumber - 1) * this.state.itemsCountPerPage;
    let endIndex = startIndex + this.state.itemsCountPerPage;
    this.setState({
      activePage: pageNumber,
      itemsToShow: this.state.filteredItems.slice(startIndex, endIndex)
    });
  };

  handleInputChange = e => {
    this.setState({
      keyword: e.target.value.toLowerCase()
    });

    this.applyFilter(this.state.filter, e.target.value.toLowerCase());
  };

  handleFilterChange = data => {
    this.setState({
      filter: data
    });
    this.applyFilter(data, this.state.keyword);
  };

  applyFilter = (filter, word) => {
    const { totalItems } = this.state;

    let items = totalItems.filter(
      item =>
        (!filter.min || item.monthly_rental >= filter.min) &&
        (!filter.max || item.monthly_rental <= filter.max) &&
        (!filter.engineTypes.length ||
          filter.engineTypes.find(elem => elem === item.engine_type)) &&
        (!filter.transmissions.length ||
          filter.transmissions.find(elem => elem === item.transmission)) &&
        (!word.length ||
          item.name.toLowerCase().includes(word) ||
          item.model.toLowerCase().includes(word) ||
          item.contract_type.toLowerCase().includes(word) ||
          item.derivative.toLowerCase().includes(word))
    );

    this.setState({
      activePage: 1,
      filteredItems: items,
      itemsToShow: items.slice(0, this.state.itemsCountPerPage)
    });
  };

  render() {
    const {
      filteredItems,
      itemsToShow,
      activePage,
      itemsCountPerPage,
      pageRangeDisplayed,
      loading,
      transmissionList,
      engineTypeList,
      rentalRange
    } = this.state;

    return (
      <div className="container">
        <Pagination
          prevPageText="<"
          nextPageText=">"
          firstPageText="<<"
          lastPageText=">>"
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={filteredItems.length}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={this.handlePageChange}
        />
        <div className="float-left pt-md-4 mt-md-2 font-weight-bold">
          Search Result : {filteredItems.length}
        </div>
        <InputGroup className="mb-3">
          <FormControl
            onChange={this.handleInputChange}
            placeholder="Have a specific car in mind? Try it"
          />
        </InputGroup>
        {loading ? (
          <Spinner animation="border" className="spinner-pos" />
        ) : (
          <div />
        )}
        <div className="row">
          <div className="col-lg-3 filter-panel">
            <Filter
              transmissions={transmissionList}
              engineTypes={engineTypeList}
              rentalRange={rentalRange}
              handleChange={this.handleFilterChange}
              handleTypeChange={this.handleTypeChange}
            />
          </div>
          <div className="col-lg-9">
            {itemsToShow.map((item, index) => (
              <Vehicle key={index} vehicle={item} />
            ))}
          </div>
        </div>
        <div style={{ height: 100 }}></div>
      </div>
    );
  }
}
