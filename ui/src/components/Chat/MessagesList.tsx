import React, { useEffect, useState } from 'react';
import { ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Message from '../../models/Message';
import { useChat } from '../../ChatContext';
import MessageDto from '../../models/Message';

interface Props {
  initialMessages: MessageDto[];
}

export default function MessagesList({ initialMessages }: Props) {
  const deafultState: Message[] = [];
  const [messages, addMessage] = useState(deafultState);
  const chatContext = useChat();

  // useEffect(() => {
  // }, [messages])

  return (
    <List id="messages">
      {initialMessages.concat(messages).map((message: Message) => {
        return (
          <ListItem>
            <ListItemText primary={message.user} secondary={<>{message.message}</>} />
          </ListItem>
        );
      })}
    </List>
  );
}
