import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const FilterUsers = (props) => {
  const { getSearchParams } = props;
  const instrumentsData = [
    { value: "Guitar", label: "Guitar" },
    { value: "Drums", label: "Drums" },
    { value: "Bass", label: "Bass" },
    { value: "Piano", label: "Piano" },
    { value: "Singer", label: "Singer" },
    { value: "Harmonica", label: "Harmonica" },
    { value: "Saxophone", label: "Saxophone" },
    { value: "Trumpet", label: "Trumpet" },
  ];
  const [search, setSearch] = useState("");
  const [instruments, setInstruments] = useState([]);
  const animatedComponents = makeAnimated();
  let requestBody;
  const handleSubmit = (e) => {
    e.preventDefault();
    requestBody = { search, instruments };
    setSearch("");
    setInstruments([]);
    getSearchParams(requestBody);
  };
  // si quisiera filtrar onchange, deberia pasar el getsearchparam en el onchange y no el onsubmit
  return (
    <div>
      <Form onSubmit={handleSubmit} id="form-task">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="search"
            value={search}
            placeholder="Enter the username"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Categories</Form.Label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={instrumentsData}
            onChange={(e) => setInstruments(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FilterUsers;
