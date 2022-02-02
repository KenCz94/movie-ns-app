import { Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import ScoreEmpty from "../../../../../vendor/images/score-empty.svg";
import ScoreFresh from "../../../../../vendor/images/score-fresh.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ScoreLabel = styled(Typography)(spacing);

const AudienceScoreIcon = styled.img`
  margin-right: 6px;
  width: 50px;
`;

const UserScoreIcon = styled(AccountCircleIcon)`
  margin-right: 6px;
  font-size: 50px;
  color: ${({ ishigher }) => (ishigher === "true" ? `#f39c12` : `#CCD1D1`)};
`;

const MovieScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  color: #f39c12;
`;

const MovieScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${(props) => props.theme.spacing(4)}px;
`;

const MovieScoreItemTitle = styled.h6`
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
`;

const MovieScoreItemInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MovieScore = ({ data, userScore }) => {
  const { score_avg: score } = data;

  return (
    <>
      <MovieScoreContainer>
        <MovieScoreItem>
          <MovieScoreItemInfo>
            {score === 5 ? (
              <AudienceScoreIcon src={ScoreFresh} />
            ) : (
              <AudienceScoreIcon src={ScoreEmpty} />
            )}

            <ScoreLabel mr={1} variant="h3" component="span">
              {score}
            </ScoreLabel>
            <ScoreLabel variant="subtitle1" component="span">
              / 5
            </ScoreLabel>
          </MovieScoreItemInfo>
          <MovieScoreItemTitle> AUDIENCE SCORE</MovieScoreItemTitle>
        </MovieScoreItem>
        <MovieScoreItem>
          <MovieScoreItemInfo>
            {userScore === 5 ? (
              <UserScoreIcon ishigher="true" />
            ) : (
              <UserScoreIcon />
            )}

            <ScoreLabel mr={1} variant="h3" component="span">
              {userScore ? userScore : "?"}
            </ScoreLabel>
            <ScoreLabel variant="subtitle1" component="span">
              / 5
            </ScoreLabel>
          </MovieScoreItemInfo>
          <MovieScoreItemTitle>USER SCORE</MovieScoreItemTitle>
        </MovieScoreItem>
      </MovieScoreContainer>
    </>
  );
};

export default MovieScore;
