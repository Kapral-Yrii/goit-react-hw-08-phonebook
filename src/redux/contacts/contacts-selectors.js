export const getItems = state => state.contactsApi.queries["fetchContacts(undefined)"]
export const getFilter = state => state.contacts.filter
export const getContacts = state => state.contacts.item