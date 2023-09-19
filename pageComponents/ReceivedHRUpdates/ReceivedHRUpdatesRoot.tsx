'use client';

import React, { type ReactElement, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Checkbox,
  Typography,
  Pagination,
  FormControlLabel,
} from '@mui/material';
import { updateCompletedStatus } from '@/utils/api';
import ReceivedHRUpdatesList from './ReceivedHRUpdatesList';
import { ResponseType } from './ReceivedHRUpdates.types';

const CARDS_PER_PAGE = 3;
const INITIAL_PAGE = 1;

type ReceivedHRUpdatesRootPropsType = {
  data: ResponseType;
};

const ReceivedHRUpdatesRoot = ({
  data,
}: ReceivedHRUpdatesRootPropsType): ReactElement => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [showCompleted, setShowCompleted] = useState(false);
  const router = useRouter();

  const completedUpdates = useMemo(
    () => data.filter((update) => update.status),
    [data]
  );

  const unCompletedUpdates = useMemo(
    () => data.filter((update) => !update.status),
    [data]
  );

  const updates = showCompleted ? completedUpdates : unCompletedUpdates;
  const totalCards = updates.length;
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentCards = updates.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCompleted(event.target.checked);
  };

  const handleMarkCompletedClick = async (id: number) => {
    try {
      await updateCompletedStatus(id, true);
      router.refresh();
    } catch {
      // eslint-disable-next-line no-console
      console.error('API error');
    }
  };

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
  }, [showCompleted]);

  return (
    <>
      <Grid container justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          HR Updates
        </Typography>

        <FormControlLabel
          label="Show Completed"
          control={
            <Checkbox checked={showCompleted} onChange={handleCheckboxChange} />
          }
        />
      </Grid>

      {totalCards > 0 &&
        currentCards.map((card) => (
          <Card className="mb-4" key={card.id}>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Typography variant="h6">{card.manager}</Typography>
                <Typography variant="h6">{card.dateReceived}</Typography>
              </Grid>

              <Grid container>
                <Grid item xs={12} md={6}>
                  <ReceivedHRUpdatesList
                    heading="Departures"
                    departures={card.unchecked}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ReceivedHRUpdatesList
                    heading="Comments"
                    comments={card.comments}
                  />
                </Grid>
              </Grid>

              {!card.status && (
                <Grid container justifyContent="flex-end">
                  <Button
                    onClick={() => handleMarkCompletedClick(card.id)}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Mark Completed
                  </Button>
                </Grid>
              )}
            </CardContent>
          </Card>
        ))}

      <Grid container justifyContent="center">
        {!showCompleted && !unCompletedUpdates.length && (
          <Typography variant="h6">No Uncompleted Updates</Typography>
        )}

        {showCompleted && !completedUpdates.length && (
          <Typography variant="h6">No Completed Updates</Typography>
        )}
      </Grid>

      {totalCards > CARDS_PER_PAGE && (
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

export default ReceivedHRUpdatesRoot;
