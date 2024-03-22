import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import SearchBar from "/components/SearchBar";
import Filter from "@/components/Filter/Index";
import ActivityCard from "@/components/ActivityCard";
import { useSession, signOut } from "next-auth/react";
import LoginPage from "./loginpage";
import LogoutIcon from "@/Icons/Logout";
import CardForm from "@/components/CardForm";

export default function HomePage({ onSubmit, setIsEditMode }) {
  const { data: session } = useSession();
  const { data: activities, isLoading } = useSWR("/api/activities");
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilterWindow, setShowFilterWindow] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = ({ author, category }) => {
    setAuthorFilter(author);
    setCategoryFilter(category);
  };

  function getFilteredActivities() {
    if (!isLoading && activities) {
      let filtered = activities;

      if (authorFilter) {
        filtered = filtered.filter(
          (activity) =>
            activity.author.toLowerCase() === authorFilter.toLowerCase()
        );
      }

      if (categoryFilter) {
        filtered = filtered.filter(
          (activity) =>
            activity.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      return filtered;
    }
  }

  const filteredActivities = getFilteredActivities();

  const displayedActivities = searchTerm
    ? filteredActivities.filter((activity) =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredActivities;

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  const handleCreateClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseClick = () => {
    setIsCreateMode(false);
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <StyledHeadlineBox>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledHeadline>MeetMate</StyledHeadline>
          <StyledLogoutButton onClick={() => signOut()}>
            <LogoutIcon />
          </StyledLogoutButton>
        </StyledHeadlineBox>
        <StyledSearchFilterBox>
          <SearchBar onSearch={handleSearch} />
          <StyledFilterButton onClick={toggleFilterWindow}>
            Filter
          </StyledFilterButton>
        </StyledSearchFilterBox>
        <Filter onSubmit={handleFilter} showFilterWindow={showFilterWindow} />
        <StyledCardSection>
          {displayedActivities.length > 0 ? (
            displayedActivities.map((activity) => (
              <Link key={activity._id} href={`/${activity._id}`}>
                <ActivityCard
                  name={activity.name}
                  date={activity.date}
                  time={activity.time}
                  joined={activity.joined}
                  category={activity.category}
                />
              </Link>
            ))
          ) : (
            <div>No results found</div>
          )}
        </StyledCardSection>
        {!isCreateMode && <Navigation onCreateClick={handleCreateClick} />}
        {isCreateMode && (
          <Overlay>
            <CardForm
              pageTitle="Create your activity!"
              onCancel={handleCloseClick}
              setIsCreateMode={setIsCreateMode}
              setIsEditMode={setIsEditMode}
              isEditMode={false}
              onSubmit={onSubmit}
            />
          </Overlay>
        )}
      </>
    );
  }
  return (
    <>
      <LoginPage />
    </>
  );
}

const StyledLogoutButton = styled.button`
  position: relative;
  left: ${theme.spacing.xl};
`;

const StyledFilterButton = styled.button`
  height: 2.4rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: ${theme.spacing.large};
  width: 100%;
  height: 100%;
  background-color: ${theme.primaryColor};
  overflow-y: auto;
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: ${theme.spacing.medium};
`;

const StyledLogoWrapper = styled.div`
  width: 1.7rem;
  height: 1.7rem;
`;

const StyledHeadline = styled.h1`
  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledSearchFilterBox = styled.div`
  display: flex;
  gap: ${theme.spacing.medium};
  margin: 0 auto;
  width: 20rem;
  margin-bottom: ${theme.spacing.small};
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 6rem;
  @media screen and (min-width: 600px) {
    margin-bottom: 6.5rem;
  }
  @media screen and (min-width: 900px) {
    margin-bottom: 7rem;
  }
  @media screen and (min-width: 1200px) {
    margin-bottom: 7.5rem;
  }
`;
