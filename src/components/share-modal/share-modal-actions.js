import { createAction } from 'redux-tools';

export const setOpen = createAction('shareModal/toggle');
export const setLinks = createAction('shareModal/setLinks');
export const setTab = createAction('shareModal/setTab');
export const setAnalytics = createAction('shareModal/setAnalytics');
