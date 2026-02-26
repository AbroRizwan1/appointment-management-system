import { useState } from "react";
import Button from "../../Button";
import HeadingText from "../../HeadingText";
import Input from "../../Input";
import QueryValidation from "./QueryValidation";

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
    name: "message",
    label: "Your Query",
    placeholder: "Type your query",
    value: "",
    type: "textarea",
  },
];

const QueryForm = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [allQueries, setAllQueries] = useState(() => {
    const savedData = localStorage.getItem("QUERY");
    const parsedData = savedData ? JSON.parse(savedData) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  });

  function handleSubmit(e) {
    e.preventDefault();

    // validation
    const queryErrors = QueryValidation(formData);
    setErrors(queryErrors);

    if (Object.keys(queryErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    alert("Query submitted successfully!");

    const newQuery = {
      id: Date.now(), // ✅ unique id
      ...formData,
    };

    //  Create updated array
    const updatedQueries = [...allQueries, newQuery];
    //  Update state
    setAllQueries(updatedQueries);
    //  Save to localStorage
    localStorage.setItem("QUERY", JSON.stringify(updatedQueries));

    // form Reset
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  }

  return (
    <section className="mt-17 mb-20  px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <HeadingText
          heading="Have a Question?"
          text=" Send us your query and our team will contact you shortly."
        />
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl  mt-10 p-6   sm:p-8 md:p-10">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-4">
              {Inputs.map((input, index) => {
                return (
                  <div key={index}>
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
                        setErrors((prev) => ({
                          ...prev,
                          [input.name]: "",
                        }));
                      }}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors[input.name]}
                    </p>
                  </div>
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
