import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FiSave } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "@/store";

export default function CardForm({
  onCancel,
  existingActivityData,
  pageTitle,
}) {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = existingActivityData
    ? `/api/activities/${id}`
    : "/api/activities";
  const method = existingActivityData ? "PUT" : "POST";
  const { mutate } = useSWR(endpoint);
  const { data: session, status } = useSession();
  const { setIsEditMode, isEditMode } = useStore();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
    activityData.joined = false;
    activityData.authorId = session.user.id;

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });
    if (response.ok) {
      mutate();
      onCancel();
      setIsEditMode(false);
      event.target.reset();
      if (isEditMode) {
        toast.success("Activity updated successfully!");
      } else {
        toast.success("Activity created successfully!");
      }
    } else {
      toast.error("Failed to save changes. Please try again.");
    }
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (existingActivityData) {
      inputRef.current.focus();
    }
  }, [existingActivityData]);

  const [selectedCategory, setSelectedCategory] = useState(
    existingActivityData?.category || ""
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = () => {
    adjustTextareaHeight();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <StyledCardForm onSubmit={handleSubmit}>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      {pageTitle && <StyledPageTitle>{pageTitle}</StyledPageTitle>}
      <StyledActivityNameBox selectedcategory={selectedCategory}>
        <label htmlFor="name" />
        <StyledActivityNameInput
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          minLength="3"
          maxLength="12"
          placeholder="My activity"
          defaultValue={existingActivityData?.name || ""}
          autoFocus
          required
        />
      </StyledActivityNameBox>
      <StyledInputBox>
        <StyledUpperInputBox>
          <StyledLabel htmlFor="author">Author: </StyledLabel>
          <StyledInputField
            type="text"
            id="author"
            name="author"
            autoComplete="off"
            defaultValue={existingActivityData?.author || ""}
            required
          />
          <StyledLabel htmlFor="date">Date: </StyledLabel>
          <StyledInputField
            type="date"
            id="date"
            name="date"
            autoComplete="off"
            min={getCurrentDate()}
            defaultValue={existingActivityData?.date || ""}
            required
          />
          <StyledLabel htmlFor="time">Time: </StyledLabel>
          <StyledInputField
            type="time"
            id="time"
            name="time"
            autoComplete="off"
            min={getCurrentTime()}
            defaultValue={existingActivityData?.time || ""}
            required
          />
          <StyledLabel htmlFor="location">Location: </StyledLabel>
          <StyledInputField
            type="text"
            id="location"
            name="location"
            autoComplete="off"
            defaultValue={existingActivityData?.location || ""}
            required
          />
          <StyledLabel htmlFor="category">Category: </StyledLabel>
          <StyledCategoryInput
            type="text"
            id="category"
            name="category"
            defaultValue={existingActivityData?.category || ""}
            onChange={handleCategoryChange}
          >
            <option id="choose" name="chosoe" value="">
              --choose--
            </option>
            <option id="sports" name="sports" value="Sports">
              Sports
            </option>
            <option id="culture" name="culture" value="Culture">
              Culture
            </option>
            <option id="food" name="food" value="Food">
              Food
            </option>
            <option id="outdoor" name="outdoor" value="Outdoor">
              Outdoor
            </option>
            <option id="others" name="others" value="Others">
              Others
            </option>
          </StyledCategoryInput>
        </StyledUpperInputBox>
        <StyledDescriptionBox>
          <label htmlFor="description">Description: </label>
          <StyledTextArea
            ref={textareaRef}
            onChange={handleChange}
            autoComplete="off"
            type="text"
            id="description"
            name="description"
            defaultValue={existingActivityData?.description || ""}
            placeholder={"Add more details..."}
          />
        </StyledDescriptionBox>
        <StyledButtonBox>
          <StyledButton type="button" onClick={onCancel}>
            <TbArrowBack size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
          <StyledButton type="submit">
            <FiSave size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
        </StyledButtonBox>
      </StyledInputBox>
    </StyledCardForm>
  );
}

const categoryColors = {
  Sports: `${theme.secondaryColors.sports}`,
  Culture: `${theme.secondaryColors.culture}`,
  Food: `${theme.secondaryColors.food}`,
  Outdoor: `${theme.secondaryColors.outdoor}`,
};

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};

  width: ${theme.box.width};
`;

const StyledLogoWrapper = styled.div`
  width: ${theme.button.xs};
  height: ${theme.button.xs};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledPageTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
  margin: ${theme.spacing.small};
`;

const StyledCardForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: ${theme.spacing.small};
  width: ${theme.box.width};
  justify-content: space-evenly;
`;

const StyledActivityNameBox = styled.div`
  display: flex;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  height: ${theme.box.height};
  background-color: ${(props) =>
    props.selectedCategory
      ? categoryColors[props.selectedcategory]
      : "transparent"};
`;

const StyledActivityNameInput = styled.input`
  display: inline-block;
  margin: auto;
  width: 95%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${theme.textColor};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.large};
  text-align: center;
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
  &::placeholder {
    opacity: 0.9;
    border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled.button`
  height: ${theme.button.medium};
  width: ${theme.button.medium};
`;

const StyledInputBox = styled.div`
  margin: auto;
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.large};
  padding-bottom: ${theme.spacing.medium};
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
`;

const StyledUpperInputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: ${theme.spacing.medium};
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: end;
  width: 5.5rem;
`;

const StyledInputField = styled.input`
  display: flex;
  justify-content: start;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  width: 8rem;
  background-color: ${theme.primaryColor};
  border: none;
  border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
`;

const StyledCategoryInput = styled.select`
  width: 8rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  text-align: center;
  background-color: ${theme.primaryColor};
  border: none;
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const StyledTextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  height: auto;
  min-height: ${theme.box.height};
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes.small};
  padding: ${theme.spacing.small};
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
  background-color: ${theme.primaryColor};
  &::placeholder {
    font-family: ${theme.fonts.text};
    font-size: ${theme.fontSizes.small};
    opacity: 0.5;
  }
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.medium};
  gap: 1rem;
`;
