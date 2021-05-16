import { Button, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React from "react";

export default class AddCityCard extends React.Component<
  { emitter: any },
  { cityList: any[]; selectedCity: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { cityList: [], selectedCity: "default" };
    this.changeCityAdd = this.changeCityAdd.bind(this);
  }
  async getCities(): Promise<any> {
    const {
      data: { data: fullCityList },
    }: any = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/cities/?countryCode=FR`,
      { withCredentials: true }
    );
    const smallCityList: any = new Array(100);
    for (let index: number = 0; index < 100; index++) {
      smallCityList.push(fullCityList[index]);
    }
    return smallCityList;
  }
  changeCityAdd(event: any) {
    const newCity = event.target.value;
    this.setState({ selectedCity: newCity });
  }
  async AddCity() {
    if (this.state.selectedCity === "default") return;
    const {
      data: { csrfToken },
    } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/csrf`, {
      withCredentials: true,
    });

    const choosenCityID = this.state.selectedCity;
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/user/add_city`,
        { city: choosenCityID },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        this.props.emitter.emit("addedCity", choosenCityID);
      });
    this.setState({ selectedCity: "default" });
  }
  async componentDidMount() {
    const cityList = await this.getCities();
    this.setState({ cityList: cityList });
  }
  render() {
    return (
      <div className="AddCityCard">
        <Select
          name="cities"
          id="cities-select"
          value={this.state.selectedCity}
          onChange={this.changeCityAdd}
        >
          <MenuItem value="default">--Choose a city to add--</MenuItem>
          {this.state.cityList?.map((city: any) => {
            return (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          onClick={() => {
            this.AddCity();
          }}
        >
          add city
        </Button>
      </div>
    );
  }
}
