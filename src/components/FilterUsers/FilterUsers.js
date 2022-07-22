import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const FilterUsers = () => {
  const instrumentsData = [
    "Guitar",
    "Drums",
    "Bass",
    "Piano",
    "Singer",
    "Harmonica",
    "Saxophone",
    "Trumpet",
  ];
  const [search, setSearch] = useState("");
  const [instruments, setInstruments] = useState([]);
  const animatedComponents = makeAnimated();
  let requestBody
  const handleSubmit = (e) => {
    e.preventDefault();
    requestBody=  { search, instruments };
    setSearch("");
    setInstruments([]);
    return requestBody;
  };
  console.log(requestBody)

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
            defaultValue={[instrumentsData[7]]}
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
