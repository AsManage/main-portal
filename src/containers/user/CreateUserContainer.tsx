import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  filter,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import "react-responsive-pagination/themes/classic.css";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { getListRoleAction, userSelector } from "store/user";
import { showData } from "utils/common";
import { createUserInTenant } from "services/user.service";
import { EMAIL_REGEX } from "utils/regex";

type Props = {};

export const CreateUserContainer = (props: Props) => {
  const { listRole } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    province: "",
    city: "",
    phoneNumber: "",
    email: "",
    gender: "",
    status: "",
    workingPosition: "",
    roleId: "",
  });

  const [formDataError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    workingPosition: "",
    roleId: "",
  });

  const handleChangeForm = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const error = { ...formDataError };
    if (!EMAIL_REGEX.test(formData.email)) {
      error.email = "Invalid email format!";
      valid = false;
    } else if (!formData.email) {
      valid = false;
      error.lastName = "Last name is required";
    } else {
      error.email = "";
    }
    if (!formData.firstName) {
      valid = false;
      error.firstName = "First name is required";
    } else error.firstName = "";
    if (!formData.lastName) {
      valid = false;
      error.lastName = "Last name is required";
    } else error.lastName = "";

    if (!formData.status) {
      valid = false;
      error.status = "Status is required";
    } else error.status = "";
    if (!formData.workingPosition) {
      valid = false;
      error.workingPosition = "Working Position is required";
    } else error.workingPosition = "";
    if (!formData.roleId) {
      valid = false;
      error.roleId = "Role Id is required";
    } else error.roleId = "";
    setFormError(error);

    if (valid) {
      await createUserInTenant(formData);
    }
  };

  useEffect(() => {
    dispatch(getListRoleAction());
  }, [dispatch]);

  return (
    <Box>
      <PaperWrapper label="Create User Form">
        <Flex flexDirection="column" gap="12px">
          <Flex gap="12px">
            <Box>
              <Text className="required" mb="8px">
                First Name
              </Text>
              <Input
                placeholder="Organisation name"
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                isInvalid={formDataError.firstName?.length > 0}
                minW="300px"
                value={formData.firstName}
                onChange={(e) => {
                  handleChangeForm("firstName", e.target.value);
                }}
              />
              {formDataError.firstName && (
                <Text className="error-message">{formDataError.firstName}</Text>
              )}
            </Box>
            <Box>
              <Text className="required" mb="8px">
                Last Name
              </Text>
              <Input
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                isInvalid={formDataError.lastName?.length > 0}
                value={formData.lastName}
                onChange={(e) => {
                  handleChangeForm("lastName", e.target.value);
                }}
              />
              {formDataError.lastName && (
                <Text className="error-message">{formDataError.lastName}</Text>
              )}
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box>
              <Text mb="8px">Location</Text>
              <Input
                placeholder="Organisation name"
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                value={formData.location}
                onChange={(e) => {
                  handleChangeForm("location", e.target.value);
                }}
              />
            </Box>
            <Box>
              <Text mb="8px">Province</Text>
              <Input
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                value={formData.province}
                onChange={(e) => {
                  handleChangeForm("province", e.target.value);
                }}
              />
            </Box>
            <Box>
              <Text mb="8px">City</Text>
              <Input
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                value={formData.city}
                onChange={(e) => {
                  handleChangeForm("city", e.target.value);
                }}
              />
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box>
              <Text mb="8px">Phone Number</Text>
              <Input
                placeholder="Organisation name"
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                value={formData.phoneNumber}
                onChange={(e) => {
                  handleChangeForm("phoneNumber", e.target.value);
                }}
              />
            </Box>
            <Box>
              <Text className="required" mb="8px">
                Email
              </Text>
              <Input
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                isInvalid={formDataError.email?.length > 0}
                value={formData.email}
                onChange={(e) => {
                  handleChangeForm("email", e.target.value);
                }}
              />
              {formDataError.email && (
                <Text className="error-message">{formDataError.email}</Text>
              )}
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box>
              <Text mb="8px">Gender</Text>
              <Select
                focusBorderColor="purple.400"
                colorScheme="purple"
                placeholder="Select option"
                variant="filled"
                minW="300px"
                value={formData.gender}
                onChange={(e) => {
                  handleChangeForm("gender", e.target.value);
                }}
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </Select>
            </Box>
            <Box>
              <Text className="required" mb="8px">
                Status
              </Text>
              <Select
                focusBorderColor="purple.400"
                colorScheme="purple"
                placeholder="Select option"
                variant="filled"
                minW="300px"
                isInvalid={formDataError.status?.length > 0}
                value={formData.status}
                onChange={(e) => {
                  handleChangeForm("status", e.target.value);
                }}
              >
                <option value={"Active"}>Active</option>
                <option value={"Inactive"}>Inactive</option>
              </Select>
              {formDataError.status && (
                <Text className="error-message">{formDataError.status}</Text>
              )}
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box>
              <Text className="required" mb="8px">
                Working Position
              </Text>
              <Input
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                minW="300px"
                isInvalid={formDataError.workingPosition?.length > 0}
                value={formData.workingPosition}
                onChange={(e) => {
                  handleChangeForm("workingPosition", e.target.value);
                }}
              />
              {formDataError.workingPosition && (
                <Text className="error-message">
                  {formDataError.workingPosition}
                </Text>
              )}
            </Box>
            <Box>
              <Text className="required" mb="8px">
                Role
              </Text>
              <Select
                focusBorderColor="purple.400"
                colorScheme="purple"
                placeholder="Select option"
                variant="filled"
                minW="300px"
                isInvalid={formDataError.roleId?.length > 0}
                value={String(formData.roleId)}
                onChange={(e) => {
                  handleChangeForm("roleId", e.target.value);
                }}
              >
                {listRole
                  ?.filter((ele: { id: number }) => ele.id !== 0)
                  .map((ele: any) => {
                    return (
                      <option key={ele?.id} value={ele?.id}>
                        {showData(ele?.name)}
                      </option>
                    );
                  })}
              </Select>
              {formDataError.roleId && (
                <Text className="error-message">{formDataError.roleId}</Text>
              )}
            </Box>
          </Flex>
        </Flex>
        <Box textAlign="left" mt="12px">
          <Button
            leftIcon={<IoMdAdd fontSize="24px" />}
            colorScheme="purple"
            variant="outline"
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </Box>
      </PaperWrapper>
    </Box>
  );
};
