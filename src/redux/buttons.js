import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";

import { entityAdapterWithExtract, myNormalize } from "@utils/redux";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { getButtonsByOwnerIdApi } from "@api/buttons";
import { button } from "@validation/normalizr";

const buttonsSelector = (state) => state.buttons;

export const getButtonByIdSelector = createSelector(
  buttonsSelector,
  (_, { buttonId }) => buttonId,
  ({ entities }, buttonId) => entities[buttonId]
);

export const getAllButtonsByOwnerIdSelector = createSelector(
  buttonsSelector,
  (_, { ownerId }) => ownerId,
  ({ entities }, ownerId) =>
    Object.values(entities).filter((e) => e.owner === ownerId)
);

export const buttonsAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "buttons"
);

export const getAllButtonsByOwnerThunk = createAsyncThunkWrapped(
  "buttons/getAllUserButtons",
  async ({ ownerId }) => {
    const response = await getButtonsByOwnerIdApi(ownerId);
    return myNormalize(response.data, [button]);
  }
);

export const buttons = createSlice({
  name: "buttons",
  initialState: buttonsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getAllButtonsByOwnerThunk.fulfilled),
      (state, { payload }) => {
        buttonsAdapter.removeAll(state);
        buttonsAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = buttons.reducer;
export default reducer;
