import React, { useState } from "react";
import Select from "react-select";
import { Container, Txt, TextInput, Btn } from "components/src/Elements";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option11", label: "Option 11" },
  { value: "option21", label: "Option 21" },
  { value: "option31", label: "Option 31" },
  { value: "option12", label: "Option 12" },
  { value: "option22", label: "Option 22" },
  { value: "option32", label: "Option 32" },
  { value: "option13", label: "Option 13" },
  { value: "option23", label: "Option 23" },
  { value: "option33", label: "Option 33" },
  { value: "option14", label: "Option 14" },
  { value: "option24", label: "Option 24" },
  { value: "option34", label: "Option 34" },
];

export const Edit: React.FC = () => {
  const [value, setValue] = useState(null);
  const onDropdownChange = (value: any) => {
    setValue(value);
  };

  return (
    <Container
      width="100%"
      heigh="calc(100% - 30px)"
      justify="center"
      align="center"
      direction="column"
    >
      <Container
        width="100%"
        justify="center"
        align="center"
        heigh="100%"
        direction="column"
      >
        <Txt fs="28px" bold color="#000000" margin="0px 0px 35px 0px">
          Edit Information
        </Txt>
        <Container
          justify="center"
          width="50%"
          align="center"
          direction="column"
          style={{
            maxWidth: 400,
          }}
        >
          <Container
            width="100%"
            justify="flex-start"
            align="flex-start"
            direction="column"
          >
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Name
            </Txt>
            <TextInput
              style={{ border: "1px solid #C4C4C4", height: "34px" }}
              margin="0px 0px 20px 0px"
              padding="0px 0px 0px 10px"
              type="text"
              color="#000000"
              fs="16px"
              width="99%"
              borderRadius="4px"
            />
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Address
            </Txt>
            <TextInput
              style={{ border: "1px solid #C4C4C4", height: "34px" }}
              margin="0px 0px 20px 0px"
              padding="0px 0px 0px 10px"
              type="text"
              color="#000000"
              fs="16px"
              width="99%"
              borderRadius="4px"
            />
            <Txt fs="14px" bold color="#000000" margin="0px 0px 5px 0px">
              Materials
            </Txt>
            <div style={{ width: "99%", margin: "0px 0px 20px 0px" }}>
              <Select
                value={value}
                options={options}
                onChange={onDropdownChange}
                isMulti
              />
            </div>
            <Btn
              type="submit"
              bg="#FF6347"
              width="99%"
              height="30px"
              borderRadius="4px"
              margin="20px 0px 0px 0px"
            >
              <Txt color="#000000" fs="16px" pointer>
                Save Changes
              </Txt>
            </Btn>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
