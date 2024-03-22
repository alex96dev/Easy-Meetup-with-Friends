import { theme } from "@/styles";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export default function ActivityCard({ name, date, time, joined, category }) {
  const activityNameRef = useRef(null);

  useEffect(() => {
    const activityNameElement = activityNameRef.current;
    if (!activityNameElement) return;

    const containerWidth = activityNameElement.offsetWidth;
    const textWidth = activityNameElement.scrollWidth;

    if (textWidth > containerWidth) {
      activityNameElement.style.whiteSpace = "nowrap";
    } else {
      activityNameElement.style.whiteSpace = "normal";
    }
  }, [name]);

  return (
    <StyledActivityCard category={category}>
      <StyledDivLeft>
        {joined && <StyledJoinMark>XX</StyledJoinMark>}
        <StyledActivityName ref={activityNameRef}>{name}</StyledActivityName>
      </StyledDivLeft>
      <StyledDivRight>
        <StyledSection>
          <StyledPElement>{date}</StyledPElement>
          <StyledPElement>{time}</StyledPElement>
        </StyledSection>
      </StyledDivRight>
    </StyledActivityCard>
  );
}

const StyledActivityCard = styled.div`
  display: flex;
  position: relative;
  border-style: solid;
  width: ${theme.box.width};
  justify-content: space-evenly;
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  height: ${theme.box.height};
  box-shadow: ${theme.box.shadow};
  &:hover {
    box-shadow: ${theme.box.hover};
  }
  &:active {
    box-shadow: ${theme.box.hover};
  }

  margin-bottom: ${theme.spacing.medium};
  background-color: ${({ category }) => {
    switch (category) {
      case "Sports":
        return theme.secondaryColors.sports;
      case "Culture":
        return theme.secondaryColors.culture;
      case "Food":
        return theme.secondaryColors.food;
      case "Outdoor":
        return theme.secondaryColors.outdoor;
      default:
        return theme.secondaryColors.default;
    }
  }};
  @media screen and (min-width: 600px) {
    width: ${theme.box.width.split("r")[0] * 1.4 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    width: ${theme.box.width.split("r")[0] * 1.6 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    width: ${theme.box.width.split("r")[0] * 1.8 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledJoinMark = styled.p`
  position: absolute;
  top: 0;
  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.6 + "rem"};
  }
  left: ${theme.spacing.xs};
  margin-top: 0;
  margin-left: 0;
`;

const StyledDivLeft = styled.div`
  position: absolute;
  top: 50%;
  left: ${theme.spacing.xs};
  transform: translateY(-50%);
  width: 11rem;
  @media screen and (min-width: 600px) {
    width: 19rem;
  }
  @media screen and (min-width: 900px) {
    width: 21rem;
  }
  @media screen and (min-width: 1200px) {
    width: 24rem;
  }
  align-items: center;
`;
const StyledDivRight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 8rem;
  @media screen and (min-width: 600px) {
    width: 9rem;
  }
  @media screen and (min-width: 900px) {
    width: 11rem;
  }
  @media screen and (min-width: 1200px) {
    width: 12rem;
  }
  height: 85%;
  padding-left: 15px;
  border-left: solid;
  right: 0;
  border-width: ${theme.borderWidth.thin};
`;

const StyledSection = styled.section`
  top: 50%;
  transform: translateY(-50%);
  position: relative;
`;

const StyledPElement = styled.p`
  margin: 0 0 10px 0;
  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.small.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledActivityName = styled.h2`
  text-align: center;

  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.6 + "rem"};
  }
`;
