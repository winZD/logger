import { Table, TextInput, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Pencil } from "tabler-icons-react";

const Customer = () => {
  const navigate = useNavigate();
  const elements = [
    {
      name: "CROMARIS",
      oib: 30315307871,
      invoice: "R-27218",
      date: new Date().toISOString(),
    },
    {
      name: "KALI TUNA",
      oib: 30315743871,
      invoice: "R-27288",
      date: new Date().toISOString(),
    },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.oib}</td>
      <td>{element.name}</td>
      <td>{element.invoice}</td>
      <td>{element.date}</td>
      <td>
        <Group position="right">
          <Button color={"dark"}>
            <Pencil />
          </Button>
        </Group>
      </td>
    </tr>
  ));
  return (
    <>
      <TextInput placeholder="Search by any field" />
      <Group position="right" style={{ marginTop: 10 }}>
        <Button color={"dark"} onClick={() => navigate(`test`)}>
          Novi unos
        </Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>OIB</th>
            <th>Račun</th>
            <th>Datum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Customer;
