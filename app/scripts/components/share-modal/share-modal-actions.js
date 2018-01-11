import { createAction } from 'redux-tools';

export const toggleSharedModal = createAction('shareModal/toggle');
export const updateLinks = createAction('shareModal/updateLinks');
export const setActiveTab = createAction('shareModal/activeTab');
