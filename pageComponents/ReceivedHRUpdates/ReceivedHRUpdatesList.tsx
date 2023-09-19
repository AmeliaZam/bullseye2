import { List, ListItem, ListItemText } from '@mui/material';

type ReceivedHRUpdatesListPropsType = {
  heading: string;
  comments?: string;
  departures?: string[];
};

const ReceivedHRUpdatesList = ({
  heading,
  comments,
  departures,
}: ReceivedHRUpdatesListPropsType) => {
  return (
    <List disablePadding>
      <ListItem>
        <ListItemText primary={heading} />
      </ListItem>

      {departures && departures.length > 0 && (
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          {departures.map((item) => (
            <ListItemText secondary={item} key={item} />
          ))}
        </ListItem>
      )}

      {comments && comments.length > 0 && (
        <ListItem>
          <ListItemText secondary={comments} />
        </ListItem>
      )}

      {!comments && !departures?.length && (
        <ListItem>
          <ListItemText secondary="None" />
        </ListItem>
      )}
    </List>
  );
};

export default ReceivedHRUpdatesList;
