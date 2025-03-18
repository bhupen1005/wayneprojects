import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import {
  DateSelector,
  TicketUpload,
  AboutSection,
  TicketCard,
  JourneyCard,
  JourneyCardAccordian,
  JourneyTable,
  TicketForm,
  FileUpload,
  CustomerSearch,
  AddressSection,
} from "./components/Testing";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

function App() {
  const [routerType, setRouterType] = useLocalStorage({
    key: "routerType",
    defaultValue: "basic",
  });

  // comp ticketForm
  const [ticketData, setTicketData] = useState({
    ticketType: "Return (00M01D)",
    price: "£124.80",
    endDate: new Date("2024-04-27"),
    origin: "Southend Cen/Vic",
    destination: "Manchester Stns",
    route: "VIA LONDON",
  });

  const handleChange = (field: string, value: string | Date) => {
    setTicketData((prev) => ({ ...prev, [field]: value }));
  };

  // comp ticketForm

  // comp CustomerSearch
  const [search, setSearch] = useState("");
  const [autocompleteData, setAutocompleteData] = useState<string[]>([]);
  const [value, setValue] = useState<Date | null>(null);
  const onSearch = async (search: string) => {
    setSearch(search);
    const response = await fetch(
      `http://localhost:5000/users?name_like=${search}`
    );
    const data = await response.json();
    const names = data.map((user: { email: string }) => user.email);
    setTimeout(() => {
      setAutocompleteData(names);
    }, 2000);
  };

  // comp CustomerSearch

  return (
    <div className="App">
      <AboutSection
        email="rao@gmail.com"
        firstName="Hitesh"
        lastName="Soni"
        toc="I agree to the terms and conditions"
        honorific="Mr."
        title="About"
      />
      <AddressSection
        Country="India"
        Line1="Line 1"
        Line2="Line 2"
        Postcode="123456"
      />
      <DateSelector />
      <TicketUpload />
      <TicketCard
        destination="Mumbai"
        origin="Pune"
        price="1000"
        routeOperator="MSRTC"
        startDate="2021-09-01"
        ticketNumber="123456"
        ticketType="Single"
      />
      <JourneyCard
        arrivalTime={new Date().toDateString()}
        departureTime={new Date().toDateString()}
        destination={"Mumbai"}
        onAmend={() => {
          console.log("Amend");
        }}
        onView={() => {
          console.log("View");
        }}
        origin={"Pune"}
        transport={"Bus"}
      />

      <JourneyCardAccordian
        arrivalTime={new Date().toDateString()}
        departureTime={new Date().toDateString()}
        destination={"Mumbai"}
        onAmend={() => {}}
        onView={() => {}}
        origin={"Pune"}
        transport={"Bus"}
        duration="2 hours"
        onSelect={() => {}}
        trainNumber="12345"
      />

      <JourneyTable
        journeys={[
          {
            origin: "Deansgate",
            departureTime: "06:09",
            destination: "Manchester Piccadilly",
            arrivalTime: "06:15",
            operator: "Northern",
          },
          {
            origin: "Manchester Piccadilly",
            departureTime: "06:31",
            destination: "London Euston",
            arrivalTime: "08:41",
            operator: "Avanti West Coast",
          },
          {
            origin: "London Euston",
            departureTime: "08:56",
            destination: "London Liverpool Street",
            arrivalTime: "09:09",
            operator: "London Overground",
          },
          {
            origin: "London Liverpool Street",
            departureTime: "09:45",
            destination: "Southend Central",
            arrivalTime: "10:41",
            operator: "c2c",
          },
        ]}
      />

      {/* comp ticketForm */}
      <TicketForm {...ticketData} onChange={handleChange} />
      {/* comp ticketForm */}

      <FileUpload
        onFileUpload={(file) => {
          console.log(file);
        }}
      />

      <CustomerSearch
        // defaultValue={search}
        onSearch={onSearch}
        placeholder="Search for a customer"
        defaultValue={search}
        onReset={() => {
          console.log("Reset");
          setSearch("");
          setAutocompleteData([]);
        }}
        data={autocompleteData} // Pass autocomplete data
      />

      <DatePickerInput
        icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        label="Pick date"
        placeholder="Pick date"
        value={value}
        onChange={setValue}
        mx="auto"
        maw={400}
      />
    </div>
  );
}

export default App;
