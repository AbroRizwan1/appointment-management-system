import { useState } from "react";
import Button from "../../Button";
import HeadingText from "../../HeadingText";
import Input from "../../Input";

const Inputs = [
  {
    label: "Name",
    placeholder: "Full Name",
    name: "name",
    value: "",
  },
  {
    label: "Email",
    placeholder: "Email Address",
    name: "email",
    value: "",
  },
  {
    label: "Subject",
    name: "subject",
    placeholder: "Subject",
    value: "",
  },
  {
    label: "Phone",
    name: "phone",
    placeholder: "Phone",
    value: "",
  },
  {
    name: "query",
    label: "Your Query",
    placeholder: "Type your query",
    type: "textarea",
  },
];

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    query: "",
  });

  const [allQueries, setAllQueries] = useState(() => {
    const savedData = localStorage.getItem("QUERY");
    const parsedData = savedData ? JSON.parse(savedData) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  });

  function handleSubmit(e) {
    e.preventDefault();

    //  Create updated array
    const updatedQueries = [...allQueries, formData];
    //  Update state
    setAllQueries(updatedQueries);
    //  Save to localStorage
    localStorage.setItem("QUERY", JSON.stringify(updatedQueries));

    // form Reset
    setFormData({ name: "", email: "", phone: "", subject: "", query: "" });
  }

  return (
    <section className="mt-17  px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <HeadingText
          heading="Have a Question?"
          text=" Send us your query and our team will contact you shortly."
        />
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl  mt-10 p-6   sm:p-8 md:p-10">
          <form
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-4">
              {Inputs.map((input, index) => {
                return (
                  <Input
                    key={index}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    value={formData[input.name]} // 👈 value from state
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [input.name]: e.target.value,
                      }));
                    }}
                  />
                );
              })}
            </div>

            <Button type="submit" text="Submit Query" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default QueryForm;
