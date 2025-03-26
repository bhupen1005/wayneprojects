import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1 value is getting changed from 4 different events
// reducers here are the actions that can be dispatched
// the state is the current state of the machine
interface DelayRepayState {
    addClaim: string;
    activeTab: string;
    customerFormState: 'form' | 'info';
    journeyFormState: 'form' | 'list' | 'listDetail' | 'table';
}

const initialState: DelayRepayState = {
    addClaim: '',
    activeTab: 'customerTabContent',
};

const delayRepaySlice = createSlice({
    name: 'delayRepay',
    initialState,
    reducers: {
        setAddClaim(state, action: PayloadAction<string>) {
            state.addClaim = action.payload;
        },
        toggleCustomerTab(state) {
            state.activeTab =
                state.activeTab === 'customerTabContent' ? '' : 'customerTabContent';
        },
        toggleJourneyTab(state) {
            state.activeTab =
                state.activeTab === 'journeyTabContent' ? '' : 'journeyTabContent';
        },
        toggleTicketTab(state) {
            state.activeTab =
                state.activeTab === 'ticketTabContent' ? '' : 'ticketTabContent';
        },
        resetState() {
            return initialState;
        },
    },
});

export const {
    setAddClaim,
    toggleCustomerTab,
    toggleJourneyTab,
    toggleTicketTab,
    resetState,
} = delayRepaySlice.actions;

export default delayRepaySlice.reducer;
