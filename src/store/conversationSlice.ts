import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  role: 'patient' | 'doctor';
  displayText: string;
}

interface ConversationState {
  messages: Message[];
}

const initialState: ConversationState = {
  messages: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearConversation: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearConversation } = conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
