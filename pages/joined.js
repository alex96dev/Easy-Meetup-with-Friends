import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import useAuthentication from "./api/auth/useAuthentication";
import Navigation from "@/components/Navigation";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import { theme } from "@/styles";

export default function Joined() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <StyledJoinedPage>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledPageDetailTitle>Your joined activities</StyledPageDetailTitle>
      <StyledCardSection>
        {activities.map((activity) =>
          activity.joined ? (
            <Link key={activity._id} href={`/${activity._id}`}>
              <ActivityCard
                name={activity.name}
                date={activity.date}
                time={activity.time}
                joined={activity.joined}
                category={activity.category}
              />
            </Link>
          ) : null
        )}
        <Navigation />
      </StyledCardSection>
    </StyledJoinedPage>
  );
}

const StyledJoinedPage = styled.div`
  margin: ${theme.spacing.small} auto;
  max-width: ${theme.box.width};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
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

const StyledPageDetailTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
  text-align: center;
  margin: ${theme.spacing.medium};
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
