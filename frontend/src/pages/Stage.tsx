import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import Deck from '../components/Deck/Deck';
import ErrorBox from '../components/ErrorBoxs/ErrorBox';
import { DealDocument } from '../graphql/mutations/Deal';
import { ResetDocument } from '../graphql/mutations/Reset';
import { GameDetailsDocument } from '../graphql/queries/GameDetails';

function Stage(): React.ReactElement {
  const { data, loading, error } = useQuery(GameDetailsDocument);
  const [deal] = useMutation(DealDocument, {
    refetchQueries: [{ query: GameDetailsDocument }],
  });
  const [reset] = useMutation(ResetDocument, {
    refetchQueries: [{ query: GameDetailsDocument }],
  });

  useEffect(() => {
    deal();
  }, [deal]);

  const game = data?.game;

  const handleDeal = () => {
    deal();
  };

  const handleReset = () => {
    reset();
  };

  return error ? (
    <ErrorBox error={error} retry={handleReset} />
  ) : (
    <Deck loading={loading} game={game} onDeal={handleDeal} onReset={handleReset} />
  );
}

export default Stage;
