import { signIn } from "next-auth/react";
import styled from "styled-components";
import { theme } from "@/styles";
import { FiLogIn } from "react-icons/fi";
import Logo from "@/Icons/Logo";

export default function LoginPage() {
  return (
    <StyledLoginPage>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledButtonBox>
        <h3>Not signed in</h3> <br />
        <StyledLoginButton onClick={() => signIn()}>
          Sign in <FiLogIn size={theme.button.small} color={theme.textColor} />
        </StyledLoginButton>
      </StyledButtonBox>
    </StyledLoginPage>
  );
}

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin: auto;
  margin-top: ${theme.spacing.large};
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xl};
  width: ${theme.box.width};
`;

const StyledLogoWrapper = styled.div`
  width: ${theme.button.small};
  height: ${theme.button.small};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.large};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  width: ${theme.box.width};
  padding: ${theme.spacing.large};
  margin: auto;
`;

const StyledLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: ${theme.spacing.xs};
  width: ${theme.button.xl};
`;
